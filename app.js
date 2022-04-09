const API_URL = "https://api.github.com/users/";
const btn_search = document.querySelector("#btn-search");
const input_search = document.querySelector("#input-search");
const profile_img = document.querySelector("#profile-img");
const repos = document.querySelector("#repos");
const flwer = document.querySelector("#followers");
const flwing = document.querySelector("#followings");
const username = document.querySelector("#username");
const profileName = document.querySelector("#name");
const card = document.querySelector("#card");

btn_search.addEventListener("click", search)
input_search.addEventListener("keypress",function(e){
    
        if(e.key === "Enter"){
            search();
        }

        
    
})

function search(){
    var serach_item = input_search.value;
    if(!serach_item){
        toast.Show("the box is empty, please enter username!");
        console.log("hi\njo")
        card.classList.remove("card-visible");
    }else{
        fetch(API_URL+serach_item, {method: "Get" })
        .then(function(response){
            if(!response.ok){
                console.log(response)
                const err = response.status;
                return Promise.reject(err);
            }
            card.classList.remove("card-visible");
            
            return response.json();
        })
        .then((mydata) => {
            renderdata(mydata);})
        .catch(err =>{
            
            if(err===404){
                toast.Show("username dosent exist, please try again!")
                card.classList.remove("card-visible");
            }
            
        } )
        
        
    }
}

function renderdata(data){
    
        card.classList.remove("card-visible");
    
        
        window.setTimeout(() => {
            console.log(data)
        const{avatar_url,login,name,followers,following,public_repos} = data;
        profile_img.src=avatar_url;
        flwer.innerHTML = followers;
        flwing.innerHTML = following;
        username.innerHTML ="@"+login;
        repos.innerHTML = public_repos;
        if(name === null){
            profileName.innerHTML = login;
        }else{
            profileName.innerHTML= name;
        
        }
            card.classList.add("card-visible");
        },200)
        
        
    
    
}

const toast = {
    init(){
        this.hideTimeout = null;
        this.element = document.createElement('div');
        this.element.className = 'toast';
        document.body.appendChild(this.element);
    },
    Show(message){
        clearTimeout(this.hideTimeout);
        this.element.textContent = message;
        this.element.className = 'toast toast-visible';
        this.hideTimeout = setTimeout(() => {
            this.element.classList.remove('toast-visible');
        },3000);
    }
}

document.addEventListener('DOMContentLoaded', ()=> toast.init())