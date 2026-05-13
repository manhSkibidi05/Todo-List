// xử lí phần dark mode
    const btnDark = document.querySelector(".btn-dark");
    btnDark.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");
    });

// xử lí phần render 
    const tasksShow = document.querySelector(`.tasks`)
    let tasks = [];

    function render(){
        tasksShow.innerHTML = ``;
        createPageTask();
    }
    
    // chức năng chuyển trang tạo task
    const btnAdd = document.querySelector(`.tasks-header__add`);
    btnAdd.addEventListener(`click` , () => {
        render();
    })

    function createPageTask(){
        // phần tasks header
        let header = document.createElement(`div`);
        header.className = `tasks-header flex m-3 gap-2`;
        let title = document.createElement(`h2`);
        title.className = `tasks-header__title text-2xl font-bold me-auto`;
        title.textContent = `Thêm công việc mới`;
        header.appendChild(title);
        tasksShow.appendChild(header);

        // phần task form
        let tasksForm = document.createElement('div');
        tasksForm.className = 'tasks-form flex gap-4 mt-6';

        // Bên trái: tasks-form__content
        let leftContent = document.createElement('div');
        leftContent.className = 'tasks-form__content min-w-2/3 p-6 bg-[#fefcff] dark:bg-[#11131a] rounded-md flex flex-col gap-4';

        // Label và input cho tiêu đề
        let labelTitle = document.createElement('label');
        labelTitle.className = 'font-light';
        labelTitle.setAttribute('for', 'task-title');
        labelTitle.textContent = 'Tiêu đề công việc';
        let inputTitle = document.createElement('input');
        inputTitle.className = 'bg-Secondary/20 p-2 rounded-md outline-0 border-2 border-Secondary/20 focus:border-Primary transition-all duration-200 ease-in';
        inputTitle.setAttribute('type', 'text');
        inputTitle.setAttribute('name', 'task-title');
        inputTitle.setAttribute('id', 'task-title');

        // Label và textarea cho mô tả
        let labelDes = document.createElement('label');
        labelDes.className = 'font-light';
        labelDes.setAttribute('for', 'task-des');
        labelDes.textContent = 'Mô tả';
        let textarea = document.createElement('textarea');
        textarea.className = 'bg-Secondary/20 p-2 h-30 rounded-md outline-0 border-2 border-Secondary/20 focus:border-Primary transition-all duration-200 ease-in';
        textarea.setAttribute('name', 'task-des');
        textarea.setAttribute('id', 'task-des');

        leftContent.appendChild(labelTitle);
        leftContent.appendChild(inputTitle);
        leftContent.appendChild(labelDes);
        leftContent.appendChild(textarea);

        // Bên phải: wrapper div chứa detail và buttons
        let rightWrapper = document.createElement('div');
        rightWrapper.className = 'w-90 flex flex-col gap-4';

        // tasks-form__detail
        let detailDiv = document.createElement('div');
        detailDiv.className = 'tasks-form__detail p-6 bg-[#fefcff] dark:bg-[#11131a] rounded-md flex flex-col gap-4';

        // Danh mục select
        let labelCate = document.createElement('label');
        labelCate.className = 'font-light';
        labelCate.setAttribute('for', 'task-cate');
        labelCate.textContent = 'Danh mục';
        let select = document.createElement('select');
        select.className = 'bg-Secondary/20 p-2 rounded-md outline-0 border-2 border-Secondary/20 focus:border-Primary transition-all duration-200 ease-in';
        select.setAttribute('name', 'task-cate');
        select.setAttribute('id', 'task-cate');

        // Các option
        let options = ['Làm việc', 'Cá nhân', 'Sức khỏe', 'Học tập', 'Khác'];
        options.forEach(optValue => {
            let option = document.createElement('option');
            option.className = 'dark:bg-black/70';
            option.setAttribute('value', optValue);
            option.textContent = optValue;
            select.appendChild(option);
        });

        // Thời hạn date input
        let labelTime = document.createElement('label');
        labelTime.className = 'font-light';
        labelTime.setAttribute('for', 'task-time');
        labelTime.textContent = 'Thời hạn';
        let inputTime = document.createElement('input');
        inputTime.className = 'bg-Secondary/20 p-2 rounded-md outline-0 border-2 border-Secondary/20 focus:border-Primary transition-all duration-200 ease-in';
        inputTime.setAttribute('type', 'date');
        inputTime.setAttribute('name', 'task-time');
        inputTime.setAttribute('id', 'task-time');

        detailDiv.appendChild(labelCate);
        detailDiv.appendChild(select);
        detailDiv.appendChild(labelTime);
        detailDiv.appendChild(inputTime);

        // tasks-form__btn
        let btnDiv = document.createElement('div');
        btnDiv.className = 'tasks-form__btn flex flex-col gap-4';

        let addBtn = document.createElement('button');
        addBtn.className = 'task-form__btn__add bg-Primary cursor-pointer text-sm text-[#fefcff] px-4 py-2 rounded-md';
        addBtn.setAttribute('type', 'button');
        addBtn.textContent = 'Thêm công việc';

        let cancelBtn = document.createElement('button');
        cancelBtn.className = 'task-form__btn__cancel bg-red-500 cursor-pointer text-sm text-[#fefcff] px-4 py-2 rounded-md';
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Hủy';

        btnDiv.appendChild(addBtn);
        btnDiv.appendChild(cancelBtn);

        rightWrapper.appendChild(detailDiv);
        rightWrapper.appendChild(btnDiv);

        tasksForm.appendChild(leftContent);
        tasksForm.appendChild(rightWrapper);

        // Gắn toàn bộ form vào container tasksShow (giả định đã có)
        tasksShow.appendChild(tasksForm);
    }

    // chức năng tạo mới task

    function addTask(task){
        tasks.push(task);
        render();
    }