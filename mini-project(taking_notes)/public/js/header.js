function logout(){
    let token=localStorage.getItem("token");
    fetch("/auth/logout",{method:"DELETE", headers:{'Authorization':`Bearer ${token}`}}).then((res)=>res.json()).then((data)=>{
        window.alert(data.message);
    }).catch((err)=>{
        window.alert(err.message);
    });
}

function login(){
    window.location.href="/render_login_start";
}

function getHome(){
    let token=localStorage.getItem("token");
    window.location.href=`/?token=${token}`;
}

function getCategories(){
    let token=localStorage.getItem("token");
    window.location.href=`/categories?token=${token}`;
}

function getnotes(){
    let token=localStorage.getItem("token");
    window.location.href=`/notes?token=${token}`;
}

function getProfile(){
    let token=localStorage.getItem("token");
    window.location.href=`/profile?token=${token}`;
}