/* D3-powered scrollytelling script
   - Loads CSV from /assets/data/sample-data.csv (via PapaParse)
   - Uses d3 to draw responsive horizontal bars and a radial gauge
   - IntersectionObserver triggers step visuals
*/
(function(){
  const DATA_PATH = '/assets/data/sample-data.csv';
  const vizEl = d3.select('#viz');
  const raw = document.getElementById('raw');
  const title = document.getElementById('viz-title');
  let currentRows = [];
  let currentStep = 0;
  const STEP_BAR_COLS = {
    1: 'How often do you have personal (non-school-related) conversations with AI?',
    3: 'How often does AI remember things from your past conversations?'
  };

  function setTitle(t){ title.textContent = t; }

  function showRaw(rows){
    raw.innerHTML = '';
    const heading = document.createElement('div'); heading.className='raw-heading'; heading.textContent = 'Sample responses (first 10)';
    raw.appendChild(heading);
    rows.slice(0,10).forEach((r,i)=>{
      const d = document.createElement('div'); d.className='raw-item';
      d.textContent = `${i+1}. ${r['How often do you have personal (non-school-related) conversations with AI?'] || '—'} — ${r['When AI gives you advice, how does it make you feel emotionally?'] || '—'}`;
      raw.appendChild(d);
    });
  }

  function countBy(rows, col){
    const counts = {};
    rows.forEach(r=>{
      const v = (r[col]||'').trim();
      if(!v) return;
      counts[v] = (counts[v]||0)+1;
    });
    return counts;
  }

  function drawBarD3(counts, colName){
    vizEl.html('');
    const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
    const w = Math.max(480, document.getElementById('viz').clientWidth || 700);
    const h = Math.max(160, entries.length * 44);
    const margin = {top:14,right:24,bottom:20,left:180};
    const width = w - margin.left - margin.right;
    const height = h - margin.top - margin.bottom;

    const svg = vizEl.append('svg').attr('width',w).attr('height',h);
    const g = svg.append('g').attr('transform',`translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, d3.max(entries, d=>d[1])||1]).range([0,width]);
    const y = d3.scaleBand().domain(entries.map(d=>d[0])).range([0,height]).padding(0.2);

    const bars = g.selectAll('rect').data(entries, d=>d[0]);
    bars.join(
      enter => enter.append('rect')
        .attr('x',0).attr('y',d=>y(d[0]))
        .attr('height', y.bandwidth())
        .attr('width',0)
        .attr('fill','rgba(11,59,59,0.16)')
        .on('mouseover', (event,d)=>handleBarOver(event,d,colName))
        .on('mousemove', handleBarMove)
        .on('mouseout', handleBarOut)
        .call(enter => enter.transition().duration(800).ease(d3.easeCubic).attr('width',d=>x(d[1]))),
      update => update.call(u => u.transition().duration(700).ease(d3.easeCubic).attr('y',d=>y(d[0])).attr('width',d=>x(d[1])).attr('height', y.bandwidth())),
      exit => exit.call(e => e.transition().duration(400).attr('width',0).remove())
    );

    const labels = g.selectAll('.label').data(entries, d=>d[0]);
    labels.join(
      enter => enter.append('text').attr('class','label').attr('x',-12).attr('y',d=>y(d[0]) + y.bandwidth()/2 + 5).attr('text-anchor','end').attr('fill','#0b3b3b').style('font-size','13px').style('opacity',0).text(d=>d[0]).call(e=>e.transition().duration(600).style('opacity',1)),
      update => update.call(u=>u.transition().duration(600).attr('y',d=>y(d[0]) + y.bandwidth()/2 + 5)),
      exit => exit.remove()
    );

    const vals = g.selectAll('.value').data(entries, d=>d[0]);
    vals.join(
      enter => enter.append('text').attr('class','value').attr('x',d=>6).attr('y',d=>y(d[0]) + y.bandwidth()/2 + 5).attr('fill','#0b3b3b').style('font-size','12px').style('opacity',0).text(d=>d[1]).call(e=>e.transition().duration(700).attr('x',d=>x(d[1]) + 6).style('opacity',1)),
      update => update.call(u=>u.transition().duration(700).attr('x',d=>x(d[1]) + 6).attr('y',d=>y(d[0]) + y.bandwidth()/2 + 5).text(d=>d[1])),
      exit => exit.remove()
    );

    // create tooltip element if missing
    ensureTooltip();

    // add staggered pop animation on enter
    g.selectAll('rect').each(function(d,i){
      d3.select(this).style('transform-origin','left center');
      d3.select(this).transition().delay(i*80).duration(700).ease(d3.easeBackOut).styleTween('transform', function(){
        return t => `translateY(${(1-t)*6}px) scaleY(${0.96 + 0.04*t})`;
      });
    });
  }

  function drawGaugeD3(avg, count){
    vizEl.html('');
    const w = Math.min(600, document.getElementById('viz').clientWidth || 600);
    const h = 260;
    const svg = vizEl.append('svg').attr('width',w).attr('height',h);
    const cx = w/2; const cy = h/2 + 10; const radius = Math.min(w, h) * 0.32;

    const arc = d3.arc().innerRadius(radius*0.6).outerRadius(radius).startAngle(-Math.PI/2);
    // background arc (full range 0..1 mapped to -90..90)
    svg.append('g').attr('transform',`translate(${cx},${cy})`)
      .append('path')
      .attr('d', arc.endAngle(Math.PI/2))
      .attr('fill','rgba(11,59,59,0.06)');

    const scale = d3.scaleLinear().domain([1,5]).range([-Math.PI/2, Math.PI/2]);
    const fg = svg.append('g').attr('transform',`translate(${cx},${cy})`)
      .append('path')
      .attr('fill','rgba(11,59,59,0.18)');

    fg.transition().duration(900).ease(d3.easeCubic).attrTween('d', function(){
      const i = d3.interpolate(-Math.PI/2, scale(avg||1));
      return t => arc.endAngle(i(t))();
    });

    // center text
    const center = svg.append('text').attr('x',cx).attr('y',cy+8).attr('text-anchor','middle').style('font-size','44px').style('font-family','Cinzel,serif').text(avg?avg.toFixed(2):'—');
    svg.append('text').attr('x',cx).attr('y',cy+42).attr('text-anchor','middle').style('font-size','12px').style('fill','rgba(0,0,0,0.55)').text(`Average (1-5) — ${count} responses`);
    // pulse the center number
    center.classed('gauge-pulse', true);
  }

  function showStep(i, rows){
    switch(i){
      case 0:
        setTitle('Raw responses');
        showRaw(rows);
        vizEl.html('<div class="placeholder">Scroll to reveal visuals</div>');
        // animate raw list items
        requestAnimationFrame(()=>{
          document.querySelectorAll('.raw-item').forEach((el,idx)=>{
            el.classList.remove('fade-in');
            el.style.animationDelay = (idx*60)+'ms';
            el.classList.add('fade-in');
          });
        });
        break;
      case 1:
        setTitle('How often students talk to AI');
        const counts = countBy(rows, STEP_BAR_COLS[1]);
        drawBarD3(counts, STEP_BAR_COLS[1]);
        // highlight strongest bar after draw
        setTimeout(()=>{
          const bars = d3.selectAll('#viz svg rect');
          bars.classed('bar-glow', false);
          bars.filter((d,i)=>i===0).classed('bar-glow', true);
        }, 900);
        break;
      case 2:
        setTitle('Emotional response to AI advice');
        // parse numeric emotional responses if available
        const nums = rows.map(r=>{const v=parseFloat(r['When AI gives you advice, how does it make you feel emotionally?']); return isNaN(v)?null:v}).filter(Boolean);
        const avg = nums.length ? (nums.reduce((a,b)=>a+b,0)/nums.length) : 0;
        drawGaugeD3(avg, nums.length);
        break;
      case 3:
        setTitle('Memory & style alignment');
        const mem = countBy(rows, STEP_BAR_COLS[3]);
        drawBarD3(mem, STEP_BAR_COLS[3]);
        // give a warm gold tint briefly
        setTimeout(()=>{
          d3.selectAll('#viz svg rect').transition().duration(400).style('fill','rgba(232,198,106,0.22)').transition().duration(800).style('fill','rgba(11,59,59,0.16)');
        }, 700);
        break;
      default:
        setTitle('Exploration'); vizEl.html('');
    }
  }

  function wireSteps(rows){
    const steps = Array.from(document.querySelectorAll('.step'));
    const options = {root:null,rootMargin:'0px',threshold:0.6};
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          steps.forEach(s=>s.classList.remove('is-active'));
          en.target.classList.add('is-active');
          // animated entrance for this step
          en.target.classList.add('entered');
          setTimeout(()=>en.target.classList.remove('entered'), 1200);
          const i = parseInt(en.target.dataset.step,10);
          currentStep = i;
          currentRows = rows;
          showStep(i, rows);
        }
      });
    },options);
    steps.forEach(s=>obs.observe(s));
  }

  // enhanced tooltip: show sample responses for the hovered category
  function handleBarOver(event,d,col){
    const tip = document.getElementById('chart-tooltip'); if(!tip) return;
    // gather sample rows matching this category
    const label = d[0];
    const samples = (currentRows||[]).filter(r=> ((r[col]||'').trim() === label)).slice(0,3);
    let html = `<strong>${label}</strong><div style="color:rgba(0,0,0,0.6);margin-top:6px">${d[1]} responses</div>`;
    if(samples.length){
      html += '<hr style="border:none;border-top:1px solid rgba(0,0,0,0.06);margin:8px 0">';
      samples.forEach(s=>{
        const emo = s['When AI gives you advice, how does it make you feel emotionally?'] || '';
        const open = s['What makes it easier to open up to AI than to a person?'] || s['What feels different about talking to AI compared to talking to a friend or therapist?'] || '';
        html += `<div style="font-size:12px;margin-bottom:6px"><em>${emo}</em><div style="color:rgba(0,0,0,0.55);margin-top:4px">${open}</div></div>`;
      });
    }
    tip.innerHTML = html;
    tip.classList.add('visible');
  }

  function handleBarMove(event){
    const tip = document.getElementById('chart-tooltip'); if(!tip) return;
    const x = event.pageX; const y = event.pageY;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }

  function handleBarOut(){
    const tip = document.getElementById('chart-tooltip'); if(!tip) return; tip.classList.remove('visible');
  }

  // Tooltip helpers
  function ensureTooltip(){
    if(document.querySelector('.tooltip')) return;
    const t = document.createElement('div'); t.className='tooltip'; t.id='chart-tooltip'; document.body.appendChild(t);
  }
  function handleBarOver(event,d){
    const tip = document.getElementById('chart-tooltip'); if(!tip) return;
    tip.innerHTML = `<strong>${d[0]}</strong><div style="color:rgba(0,0,0,0.6)">${d[1]} responses</div>`;
    tip.classList.add('visible');
  }
  function handleBarMove(event){
    const tip = document.getElementById('chart-tooltip'); if(!tip) return;
    tip.style.left = (event.pageX) + 'px'; tip.style.top = (event.pageY) + 'px';
  }
  function handleBarOut(){
    const tip = document.getElementById('chart-tooltip'); if(!tip) return; tip.classList.remove('visible');
  }

  // redraw current visualization on resize
  let resizeTimeout = null;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(()=>{
      if(!currentRows) return;
      showStep(currentStep, currentRows);
    }, 160);
  });

  function boot(){
    if(!window.Papa || !window.d3){
      d3.select('#viz').html('<div class="placeholder">Error: required libraries not found</div>');
      return;
    }
    Papa.parse(DATA_PATH,{
      download:true,header:true,skipEmptyLines:true,complete:function(results){
        const rows = results.data || [];
        setTitle('Dataset loaded');
        showRaw(rows);
        wireSteps(rows);
        // wire download button
        const btn = document.getElementById('download-btn');
        if(btn){
          btn.addEventListener('click', ()=>{
            downloadCurrentChart();
          });
        }
      },error:function(err){
        d3.select('#viz').html('<div class="placeholder">Could not load data</div>');
      }
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  
  // download helper: serialize first SVG inside #viz and convert to PNG
  function downloadCurrentChart(){
    const container = document.getElementById('viz');
    const svg = container.querySelector('svg');
    if(!svg){
      alert('No chart available to download');
      return;
    }
    // get width/height
    const width = parseInt(svg.getAttribute('width')) || svg.clientWidth || 800;
    const height = parseInt(svg.getAttribute('height')) || svg.clientHeight || 400;
    // serialize SVG
    let serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);
    // add name spaces if missing
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+xmlns:xlink="http\:\/\/www\.w3\.org\/1999\/xlink"/)){
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    // add XML declaration
    source = '<?xml version="1.0" standalone="no"?>\n' + source;

    const svgUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    const img = new Image();
    img.onload = function(){
      const canvas = document.createElement('canvas');
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext('2d');
      // white background
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.drawImage(img,0,0,width,height);
      canvas.toBlob(function(blob){
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'chart.png'; document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
      }, 'image/png');
    };
    img.onerror = function(){ alert('Failed to render chart for download'); };
    img.src = svgUrl;
  }
})();
