let circleBars=[];
circleBars.push(createCircleBar('#circle-container','Comunicación','17'));
circleBars.push(createCircleBar('#circle-container2','Gestión del tiempo','10'));
circleBars.push(createCircleBar('#circle-container3','Responsabilidad','10'));
circleBars.push(createCircleBar('#circle-container4','Proactividad','20'));
circleBars.push(createCircleBar('#circle-container5','Trabajo en\n equipo','5'));


function createCircleBar(id,text,correccion){
    return new ProgressBar.Circle(id, {
        color: 'rgb(213,94,2)',
        strokeWidth: 5,
        trailWidth: 10,
        trailColor: 'none',
        easing: 'easeInOut'
        /* text: {
            value: text,
            style: {
              color: 'white',
              position: 'absolute',
              top: '45%',
              left: correccion+'%',
              padding: 0,
              margin: 0,
              transform: null
            }} */
    });
}






//aqui se controla el porcentaje de progreso
for(let circleBar of circleBars){
    circleBar.animate(0.9, {
        duration: 1500
    });
}

