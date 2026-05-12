// xử lí phần dark mode
    const btnDark = document.querySelector(".btn-dark");
    btnDark.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");
    });

// xử lí phần render 

    let tasks = [];

    function render(){

    }

    // chức năng tạo mới task
    const btnAdd = document.querySelector(`.tasks-block__add`);
    btn

    function addTask(task){
        tasks.push(task);
        render();
    }