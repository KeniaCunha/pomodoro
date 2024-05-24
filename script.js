const html = document.querySelector('html');

const botaoFoco = document.querySelector('.app__card-button--foco');

const botaoDescansoCurto = document.querySelector('.app__card-button--curto');

const botaoDescansoLongo = document.querySelector('.app__card-button--longo');

const imgBanner = document.querySelector('.app__image');

const titulo = document.querySelector('.app__title');

const botoes = document.querySelectorAll('.app__card-button');

const botaoComecar = document.getElementById('start-pause');

const ativarMusica = document.getElementById('alternar-musica');

const botaoIniciarOuPausar = document.querySelector("#start-pause span");

const alterarIconeAoPausar = document.querySelector('.app__card-primary-butto-icon');

const mostrarTempoTela = document.querySelector('#timer');


//criando um objeto audio
const musica = new Audio('/sons/luna-rise-part-one.mp3');

const somPlay = new Audio('/sons/play.wav');

const somPause = new Audio('/sons/pause.mp3');

const somTempoEsgotado = new Audio('/sons/beep.mp3')

let temporizadorDecorridoSegundos = 1500;

let intervaloId = null;

//ficar repetindo
musica.loop = true;

ativarMusica.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else
    musica.pause();
})

botaoFoco.addEventListener('click', () =>{
    temporizadorDecorridoSegundos = 1500;
    alterarContexto('foco');
    //add classe active que dá o foco nos botões
    botaoFoco.classList.add('active');
});

botaoDescansoCurto.addEventListener('click', function(){
    temporizadorDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    botaoDescansoCurto.classList.add('active');
});

botaoDescansoLongo.addEventListener('click', () =>{
    temporizadorDecorridoSegundos = 900;
    alterarContexto('descanso-longo');   
    botaoDescansoLongo.classList.add('active'); 
});

function alterarContexto(contexto){
    mostrarTempo()
//removendo a classe active
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto);
    imgBanner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma parada curta!</strong>
            `
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:        
        break;
    }    
}

const contagemRegressiva = function(){

    if(temporizadorDecorridoSegundos <= 0){
        somTempoEsgotado.play()
        alert("Tempo finalizado!")
        zerar()
        return
    }
    temporizadorDecorridoSegundos -= 1
    mostrarTempo()
}

botaoComecar.addEventListener('click', iniciarOuPausar);


function iniciarOuPausar(){

    if(intervaloId){
        somPause.play();
        zerar()
        return
    }
    somPlay.play();
    intervaloId = setInterval(contagemRegressiva,1000)
    botaoIniciarOuPausar.textContent = 'Pausar';     
    alterarIconeAoPausar.setAttribute('src', '/imagens/pause.png')

}

function zerar(){
    clearInterval(intervaloId)
    botaoIniciarOuPausar.textContent = "Começar";
    alterarIconeAoPausar.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(temporizadorDecorridoSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pr-BR', {minute: '2-digit', second: '2-digit'})
    mostrarTempoTela.innerHTML = `
        ${tempoFormatado}     
    `
}

mostrarTempo()