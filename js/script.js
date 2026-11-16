const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],R=document.documentElement;
R.classList.add('js');
const sel=(b,i)=>b.forEach((x,k)=>x.setAttribute('aria-selected',k==i));
// Menu e tema
const mb=$('#mb'),nav=$('#nav');
mb.onclick=()=>mb.setAttribute('aria-expanded',nav.classList.toggle('open'));
nav.onclick=e=>{if(e.target.tagName=='A'){nav.classList.remove('open');mb.setAttribute('aria-expanded',false)}};
try{const t=localStorage.getItem('tema');if(t)R.dataset.theme=t}catch(e){}
$('#th').onclick=()=>{const t=R.dataset.theme=='light'?'dark':'light';R.dataset.theme=t;try{localStorage.setItem('tema',t)}catch(e){}};
// Rede neural do hero
const P=[3,5,5,2].map((n,i)=>Array.from({length:n},(_,k)=>[40+i*73,150+(k-(n-1)/2)*52]));let h='';
P.forEach((l,i)=>i&&l.forEach(a=>P[i-1].forEach(b=>h+=`<line x1="${b[0]}" y1="${b[1]}" x2="${a[0]}" y2="${a[1]}" stroke="#3b6cff" stroke-opacity=".3"/>`)));
P.forEach((l,i)=>l.forEach(([x,y],k)=>h+=`<circle class="pulse" style="animation-delay:${(i*.4+k*.3).toFixed(1)}s" cx="${x}" cy="${y}" r="9" fill="${['#22d3ee','#3b6cff','#8b5cf6','#22d3ee'][i]}"/>`));
$('#nn').innerHTML=h;
// Linha do tempo
const TL=[[1950,'Alan Turing publica o artigo "Computing Machinery and Intelligence" e propõe o que ficou conhecido como Teste de Turing.'],[1956,'Na Conferência de Dartmouth, o termo "inteligência artificial" passa a nomear a área de pesquisa.'],[1997,'O computador Deep Blue, da IBM, vence o campeão mundial de xadrez Garry Kasparov em uma partida oficial.'],[2012,'O modelo AlexNet vence uma competição de reconhecimento de imagens e impulsiona o uso do deep learning.'],[2016,'O AlphaGo, da DeepMind, vence o jogador de Go Lee Sedol.'],[2017,'Pesquisadores do Google apresentam a arquitetura Transformer, base de muitos modelos de linguagem atuais.'],[2022,'Ferramentas de IA generativa, como o ChatGPT, se popularizam entre o público geral.']];
$('#tl').innerHTML=TL.map(t=>`<button class="tlb" role="tab">${t[0]}</button>`).join('');
const tb=$$('.tlb'),sh=i=>{sel(tb,i);$('#tld').textContent=TL[i][1]};tb.forEach((b,i)=>b.onclick=()=>sh(i));sh(0);
// Abas (IA generativa)
const tabs=$$('.tab');tabs.forEach((b,i)=>b.onclick=()=>{sel(tabs,i);$$('[data-p]').forEach((p,k)=>p.hidden=k!=i)});
// Ferramentas
const T=[['Texto','ChatGPT','Assistente conversacional da OpenAI.','Resumir um texto, tirar dúvidas, revisar redações.','https://chatgpt.com'],['Texto','Claude','Assistente de IA da Anthropic.','Analisar documentos, escrever e explicar conteúdos.','https://claude.ai'],['Texto','Gemini','Assistente de IA do Google.','Pesquisar ideias, resumir e planejar tarefas.','https://gemini.google.com'],['Texto','Microsoft Copilot','Assistente de IA da Microsoft.','Redigir e-mails e apoiar pesquisas.','https://copilot.microsoft.com'],['Imagens','Adobe Firefly','Gerador de imagens da Adobe.','Criar ilustrações e variações a partir de uma descrição.','https://firefly.adobe.com'],['Imagens','Midjourney','Gerador de imagens a partir de texto.','Criar artes conceituais e referências visuais.','https://www.midjourney.com'],['Vídeo','Runway','Plataforma de criação e edição de vídeo com IA.','Gerar clipes curtos e editar cenas.','https://runwayml.com'],['Programação','GitHub Copilot','Assistente de programação integrado ao editor de código.','Sugerir trechos de código e explicar erros.','https://github.com/features/copilot'],['Produtividade','Perplexity','Buscador conversacional que apresenta fontes.','Pesquisar um tema e consultar os links citados.','https://www.perplexity.ai'],['Educação','Khanmigo','Tutor de IA da Khan Academy.','Praticar exercícios com orientação passo a passo.','https://www.khanmigo.ai']];
const C=['Todas',...new Set(T.map(t=>t[0]))];
$('#tf').innerHTML=C.map(c=>`<button class="cf">${c}</button>`).join('');
const cf=$$('.cf'),rt=i=>{sel(cf,i);$('#tg').innerHTML=T.filter(t=>!i||t[0]==C[i]).map(t=>`<article class="card"><div class="lg" aria-hidden="true">${t[1][0]}</div><h3>${t[1]}</h3><p>${t[2]}</p><p><b>Exemplo:</b> ${t[3]}</p><a href="${t[4]}" target="_blank" rel="noopener">Site oficial</a></article>`).join('')};
cf.forEach((b,i)=>b.onclick=()=>rt(i));rt(0);
// Glossário
const G=[['Algoritmo','Sequência de passos para resolver um problema.'],['Machine Learning','Técnica em que o sistema aprende padrões a partir de dados.'],['Deep Learning','Aprendizado de máquina com redes neurais de muitas camadas.'],['Prompt','Instrução ou pergunta enviada a uma IA generativa.'],['Chatbot','Programa que conversa com pessoas por texto ou voz.'],['Redes neurais','Modelos em camadas inspirados livremente no cérebro.'],['LLM','Modelo de linguagem de grande porte, treinado com muito texto.'],['Token','Pedaço de texto (palavra ou parte dela) processado pelo modelo.'],['Dataset','Conjunto de dados usado para treinar ou testar um modelo.'],['Treinamento','Fase em que o modelo ajusta seus parâmetros com dados.'],['Inferência','Uso do modelo já treinado para gerar uma resposta ou previsão.'],['Modelo generativo','Modelo que cria conteúdo novo, como texto ou imagem.'],['Alucinação de IA','Resposta falsa apresentada de forma convincente.'],['Big Data','Grandes volumes de dados, de vários tipos, analisados em alta velocidade.'],['Automação','Execução de tarefas por máquinas ou software com pouca intervenção humana.']];
const rg=f=>{const r=G.filter(([t,d])=>(t+d).toLowerCase().includes(f.toLowerCase()));$('#gl').innerHTML=r.map(([t,d])=>`<div class="card"><h3>${t}</h3><p>${d}</p></div>`).join('')||'<p>Nenhum termo encontrado.</p>'};
$('#gs').oninput=e=>rg(e.target.value);rg('');
// Quiz (a primeira alternativa de cada pergunta é a correta; a ordem é embaralhada na tela)
const Q=[['Quem propôs um teste para avaliar se uma máquina exibe comportamento inteligente?',['Alan Turing','Steve Jobs','Tim Berners-Lee']],['O termo "inteligência artificial" ficou associado a qual evento de 1956?',['Conferência de Dartmouth','Lançamento do ChatGPT','Criação da internet']],['Machine Learning é...',['Aprender padrões a partir de dados','Escrever todas as regras manualmente','Um tipo de hardware']],['Qual tipo de IA existe hoje?',['IA estreita (ANI)','Superinteligência (ASI)','IA geral (AGI)']],['O que é um prompt?',['Uma instrução enviada a uma IA generativa','Um tipo de vírus','Um gráfico de dados']],['O que é uma alucinação de IA?',['Uma resposta falsa apresentada de forma convincente','Quando o computador desliga','Quando a IA aprende rápido']],['Deepfake é...',['Conteúdo sintético que imita uma pessoa real','Um antivírus','Uma rede social']],['O viés algorítmico pode surgir principalmente de...',['Dados de treinamento enviesados','Cor do computador','Velocidade da internet']],['Uma boa prática ao usar IA nos estudos é...',['Verificar as informações em fontes confiáveis','Copiar tudo sem revisar','Compartilhar dados pessoais']],['Redes neurais artificiais são inspiradas...',['Livremente no cérebro humano','Em redes elétricas','Em redes sociais']]];
let qi=0,qs=0;const qz=$('#qz');
function show(){
if(qi>=Q.length){qz.innerHTML=`<h3>Resultado final: ${qs} de ${Q.length}</h3><p>${qs>=8?'Excelente! Você domina o básico de IA.':qs>=5?'Bom trabalho! Revise alguns tópicos para melhorar.':'Releia o conteúdo do portal e tente novamente.'}</p><button class="btn" id="rs">Refazer o quiz</button>`;$('#rs').onclick=()=>{qi=qs=0;show()};return}
const m=Q[qi][1].map((t,k)=>[t,k==0]).sort(()=>Math.random()-.5);
qz.innerHTML=`<p>Pergunta ${qi+1} de ${Q.length} | Pontos: ${qs}</p><h3>${Q[qi][0]}</h3>`+m.map((x,k)=>`<button class="op" data-k="${k}">${x[0]}</button>`).join('')+'<p id="fb" aria-live="polite"></p>';
$$('.op').forEach(b=>b.onclick=()=>{const ok=m[b.dataset.k][1];if(ok)qs++;$$('.op').forEach((x,k)=>{x.disabled=true;if(m[k][1])x.classList.add('ok')});if(!ok)b.classList.add('no');$('#fb').innerHTML=(ok?'Correto! ':'Resposta incorreta. ')+`<button class="btn" id="nx">${qi<Q.length-1?'Próxima':'Ver resultado'}</button>`;$('#nx').focus();$('#nx').onclick=()=>{qi++;show()}})}
show();
// Voltar ao topo e animação ao rolar
const tp=$('#top');addEventListener('scroll',()=>tp.classList.toggle('show',scrollY>600),{passive:true});
tp.onclick=()=>scrollTo({top:0});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.08});
$$('.rv').forEach(e=>io.observe(e));
