const deleteAccount = () => {
    let btns = document.getElementsByTagName('i');
    let deleteBtns = [...btns];

    deleteBtns.forEach(btn => {
        // console.log(btn.nextElementSibling.childNodes[0].data);
        let targetId = btn.nextElementSibling.childNodes[0].data;
        btn.onclick = () => {
            // console.log(targetId);
            //这个fetch这里有很多坑！首先用post请求发送对象，必须在header中标注
            //发送请求体中数据格式为application/json，第二请求体中的对象必须通过
            //JSON.stringfy转换成json格式！这样后端才能接收的到参数！
            fetch('http://127.0.0.1:3000/record', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    targetId
                })
            }).then(response => {
                //这里一定要写response.text()！因为后端返回的结果是一个字符串
                //而非json或者其他格式！这里写错将会导致直接报错，不会进入下一个.then
                return response.text();
            }).then(res => {
                console.log(res);
                // fetch('http://127.0.0.1:3000/record', {
                //     method: 'GET'
                // });
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        }
    })
}

deleteAccount();