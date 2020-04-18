window.addEventListener('DOMContentLoaded', function() {

    'use strict';


    // создаем табы на странице


    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });


    //таймер

    let deadline = '2020-05-21'; // создаем переменную в которой хранится дата окончания.

    function getTimeRemaining(endtime){   
        let t = Date.parse(endtime)- Date.parse(new Date()), //переменная включающая разницу между датами (конечная - прямо сейчас)
        seconds = Math.floor((t/1000) % 60), // получаем секудны (% - оператор который выводит остаток от целого чилса)
        minutes = Math.floor((t/1000/60) % 60), // получаем минуты
        hours = Math.floor((t/(1000*60*60))); // получаем часы 

        return { // функция должна вернуть объект в состав которй входят все полученные значения
        'total' : t,
        'hours': hours,
        'minutes':minutes,
        'seconds':seconds
        
        };
     
    }
         function setClock(id,endtime) { //функция преврощающая статическу верстку в динамическую 
             let timer = document.getElementById(id), //получаем элемены с html
                hours = timer.querySelector('.hours'),  //получаем элемены с html
                minutes = timer.querySelector('.minutes'), //получаем элемены с html
                seconds = timer.querySelector('.seconds'), //получаем элемены с html
                timeInterval = setInterval(updateClock, 1000); 

             function updateClock(){ //функция которая будет вызываться кажду секунду
                 let t = getTimeRemaining(endtime); 

                 function addZero(num){ //функция что бы перед еденичным числом подставляелся 0 
                    if(num <= 9) {
                        return '0' + num;
                    } else {
                        return num;
                    }
                };

                 hours.textContent = addZero(t.hours);
                 minutes.textContent = addZero(t.minutes);
                 seconds.textContent = addZero(t.seconds);

                 if (t.total <= 0){ // если время закончилось, таймер останавливается
                     clearInterval(timeInterval);
                     hours.textContent = '00'; //выводится когда таймер закончится
                minutes.textContent = '00'; //выводится когда таймер закончится
                seconds.textContent = '00'; //выводится когда таймер закончится
                 }
             }   
         }


         setClock('timer',deadline);


         //modal

         let more  = document.querySelector('.more'),
             overlay = document.querySelector('.overlay'),
             close = document.querySelector('.popup-close');


             more.addEventListener('click',function(){
                 overlay.style.display ="block";
                 this.classList.add('more-splash');
                 document.body.style.overflow = "hidden";
             });

             close.addEventListener('click',function(){
                 overlay.style.display = "none";
                more.classList.remove('more-splash');
                document.body.style.overflow = "";
             });

         //form


         let message = {
             loading: 'загрузка',
             success:'Спасибо,мы с вами свяжемся',
             failure:'Что-то пошло не не так'
         }

         let form = document.querySelector('.main-form'),
             input=  form.getElementsByTagName('input'),
             statusMassege = document.createElement('div');

             statusMassege.classList.add('status');

             form.addEventListener('submit',function(event){
               event.preventDefault();
               form.appendChild(statusMassege);

               let request = new XMLHttpRequest();
               request.open('POST','server.php');
               request.setRequestHeader('Content-Type','application/json; charset = utf-8');

               let formData = new FormData(form);

               let obj = {};

               formData.forEach(function(value,key){
                   obj[key]= value;
               });

               let json = JSON.stringify(obj);
               request.send(json);

               request.addEventListener('readystatechange',function(){
                   if (request.readyState<4){
                       statusMassege.innerHTML = message.loading;
                   } else if(request.readyState === 4 && request.readyState==200){
                    statusMassege.innerHTML = message.success;
                }else{
                    statusMassege.innerHTML = message.failure;

                }
               });

                   for(let i= 0; i<input.length; i++){
                       input[i].value = '';
                   }

             });
         
             
});