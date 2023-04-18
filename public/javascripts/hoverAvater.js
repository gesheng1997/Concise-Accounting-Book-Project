let userAvater = document.getElementById('user-avater');
let userOperate = document.getElementById('user-operate');
let logoutBtn = document.getElementById('logout-btn');

userAvater.onmouseover = event => {
    // console.log(event.target);
    userAvater.classList.add('user-info-active');
    userOperate.classList.add('user-operate-active');

    userAvater.onmouseout = event => {
        userAvater.classList.remove('user-info-active');
        userOperate.classList.remove('user-operate-active');
    };
};

userOperate.onmouseover = event => {
    userAvater.classList.add('user-info-active');
    userOperate.classList.add('user-operate-active');

    userOperate.onmouseout = event => {
        userAvater.classList.remove('user-info-active');
        userOperate.classList.remove('user-operate-active');
    }
};

logoutBtn.onclick = () => {
    fetch('/record/logout',{
        method:'GET'
    }).then(response => {
        return response.text();
    }).then(res => {
        console.log(res);
        window.location.replace('/login');
    }).catch(err => {
        console.log(err);
    })
}
