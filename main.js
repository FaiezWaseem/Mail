
var upload = document.getElementById('upload');
var send = document.getElementById('send');
var compose = document.querySelector('.sidebar__compose')
var messageBoxClose = document.getElementById('close')
var menu = document.querySelector('.header__left span')
var sidebar = document.querySelector('.sidebar')
var passSubmit = document.getElementById('passsubmit')
passsubmit.onclick= ()=>{
    const key = document.getElementById('pass').value
    if(key != ''){
        const overlay = document.getElementById("overlay");
        const modal = document.getElementById("modal2");

        modal.classList.remove("active");
        overlay.classList.remove("active");
        function sendMail(){
            const email = document.getElementById('to')
            const subject = document.getElementById('sub')
            const message = document.getElementById('message')
            console.log(email)
           
            const id = 'AKfycbyopBnPc1gyUU-Hc2lpWGKxYqWEvnAJbXgTtpvnAjCmxBfn2pi-MUYggN9_cblpLrxK'
            const url = `https://script.google.com/macros/s/${id}/exec`; 
            const qs = new URLSearchParams({email: email.value,subject : subject.value, msg: message.value,key :key});
            fetch(`${url}?${qs}`, {
         method: "POST",
          body: '' })
            .then(res => res.json())
            .then(e => {
                console.log(e)
             alert(JSON.stringify(e))
             email.value = ""
             subject.value = ""
             message.value = ""
            })
            .catch(err =>{
            
                alert(err)
            
            })
        }
        
        upload.onclick = function(e){
            console.log('click')
            var  input = document.createElement('input');
            input.type = 'file';
           input.multiple = "multiple"
        
        input.onchange = e =>{
            files = e.target.files;
            fileName = e.target.files[0].name;
            for(let x = 0 ; x < e.target.files.length ; x++){
            reader = new FileReader();
            reader.readAsArrayBuffer(files[x]);
            reader.onload = f => {
         uploadToDrive2(f , files[x])
            }
               }
           }    
           input.click();
            
        }
        send.onclick = function(){
            sendMail();
        }
        
        function uploadToDrive2(f , file){
          console.log('uploading')
        
            const id = 'AKfycby17n90Jyr3TNU6NXgwtpCj_BNT9xELM44mF7zGpL5a6DHkJpc0AlOF1uri7gadTOlb'
            const url = `https://script.google.com/macros/s/${id}/exec`; 
         
           
            const qs = new URLSearchParams({filename: file.name, mimeType: file.type});
            fetch(`${url}?${qs}`, {
         method: "POST",
          body: JSON.stringify([...new Int8Array(f.target.result)])})
            .then(res => res.json())
            .then(e => {
               console.log(e)
               console.log('file uploaded')
               const message = document.getElementById('message').value += e.fileUrl
            })
            .catch(err =>{
                 console.log(err)
            })
        }
          
        compose.onclick =() =>{
            const messageBox = document.querySelector('.sendMail');
            if(messageBox.style.display == 'none'){
                messageBox.style.display = 'block'
            }else{
                messageBox.style.display = 'none'
            }
        }
        messageBoxClose.onclick = () =>{
            const messageBox = document.querySelector('.sendMail');
            messageBox.style.display = 'none'
        }
        
        menu.onclick = () =>{
                if(sidebar.style.display == 'none'){
                sidebar.style.display = 'block'
             }else{
                 sidebar.style.display = 'none'
             }
            }
            
         function Refresh() {
                    const url = `https://script.google.com/macros/s/AKfycbz6AyHcSYEmG1zo2N1rXwWAaoBwKl035nI3LOfHvLwli1bIBUR-TWvpi45KghJblPK_/exec`; 
                    fetch(url)
                      .then((res) => {
                      
                        return res.text();
                      })
                      .then((res) =>   get());
                  }
        function get() {
                    const url = `https://script.google.com/macros/s/AKfycbzendgHoFaWqCX4msiL0LI6S7sYh8Qjxc8lNQHs12Tbhe2gSwqNzJHtypIi7a-uSCZd/exec`; 
                    const qs = new URLSearchParams({key :key});
                    fetch(`${url}?${qs}`)
                      .then((res) => {
                       
                        return res.json();
                      })
                      .then((res) =>
                      {
                          if(res.status || res.message){
                             alert('Wrong Key Wont Load Anything')
                          }else{
                          const arr = res.data
                          console.log(arr.length)
                          for(let i = 0; arr.length -1 ; i++){
                            mailInbox(arr[i].From , arr[i].Subject , arr[i].Body , arr[i].Date , arr[i].id )
                          }
                         
                        }
                      }
                      ).catch((err)=>{ console.warn(err)})
                  }
                  Refresh();
                
         function mailInbox(from , subject , body , date , id){
             let sender = from;
                sender = sender.search('<');
                sender =  from.substring(0,parseInt(sender));
                let Subject = subject.substring(0,25);
                let Body = body.substring(0,28)
            let x = from.search('<')    
            let y = from.search('>')    
            let mail = from.substring(x+1,y);
        const html = `
        <!-- Email Row Starts -->
        <div class="emailRow" id='${id}' onclick="openMail(this)" sender="${mail}" sub="${subject}" msg="${body}" >
          <div class="emailRow__options">
            <input type="checkbox" name="" id="" />
            <span class="material-icons"> star_border </span>
          </div>
        
          <h3 class="emailRow__title">${sender}</h3>
        
          <div class="emailRow__message">
            <h4>
              ${Subject}..
              <span class="emailRow__description"> - ${Body}.. </span>
            </h4>
          </div>
        
          <p class="emailRow__time">${date}</p>
        </div>
        <!-- Email Row Ends -->
        `
        const list = document.querySelector('.emailList__list');
        list.innerHTML += html ;
         }         
    }else{
        alert('Enter Something !!')
    }
}
function closetheEmailView(){
    const box = document.querySelector('.EmailView')
    box.style.display = 'none'
    document.querySelector('.emailses').style.display = 'Block';
}
function openMail($){
    const box = document.querySelector('.EmailView');
    box.style.display = 'block';
    document.querySelector('.emailses').style.display = 'none';
    const sender = $.getAttribute('sender')
    const subject = $.getAttribute('sub')
    const body = $.getAttribute('msg')
   
    document.getElementById('getSubject').innerText = subject
    document.getElementById('getEmail').innerText = sender
    document.getElementById('body').innerText = body
   }