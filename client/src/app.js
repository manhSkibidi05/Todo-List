// xử lí phần dark mode
    const btnDark = document.querySelector(".btn-dark");
    document.documentElement.classList.add(`dark`);
    btnDark.addEventListener("click", function () {
        document.documentElement.classList.toggle("dark");
    });


// render page danh sách công việc
    let tasks = [];
    let tasksState = `All`;
    let tasksKeyword = ``;

    let tasksExpiry = [];

    const tasksShow = document.querySelector(`.tasks`);

    function renderListPage(){
        tasksShow.innerHTML = ``;
        createPageShow();
    }

    function createCardTask(idTask ,completed , title , des , cate , time , expiry){
        // Tạo task card
        let card = document.createElement('div');
        card.className = 'tasks-list__card p-4 bg-[#fefcff] dark:bg-[#11131a] rounded-xl flex gap-5 relative animation-fadeIn animation-fadeOut transition-all duration-200 ease-in';

        // Phần checkbox
        let checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'task-list__card__checkbox';

        let checkboxInput = document.createElement('input');
        checkboxInput.checked = completed;
        checkboxInput.type = 'checkbox';
        checkboxInput.id = `task-checkbox${idTask}`; // Nên tạo id động nếu có nhiều card
        checkboxInput.className = 'hidden peer';

        let checkboxLabel = document.createElement('label');
        checkboxLabel.setAttribute('for', `task-checkbox${idTask}`);
        checkboxLabel.className = 'inline-flex items-center justify-center w-5 h-5 rounded border-2 border-gray-400 cursor-pointer transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500';
        checkboxInput.addEventListener(`change` , (e) => {
            changeCompleted(idTask);
        })

        let icon = document.createElement('i');
        icon.className = 'fas fa-check text-xs text-[#fefcff] dark:text-[#11131a]';

        checkboxLabel.appendChild(icon);
        checkboxDiv.appendChild(checkboxInput);
        checkboxDiv.appendChild(checkboxLabel);

        // Phần nội dung bên phải
        let contentDiv = document.createElement('div');

        let titleShow = document.createElement('h3');
        titleShow.className = 'tasks-list__card__content inline text-md font-bold';
        titleShow.textContent = title;
        if(completed){
            titleShow.classList.add(`line-through`); // Nếu đã hoàn thành thì gạch ngang tiêu đề
            titleShow.style.color = '#888'; // Thay đổi màu chữ thành màu xám
        } 

        let description = document.createElement('p');
        description.className = 'tasks-list__card__des text-xs text-Neutral my-2';
        description.textContent = des;

        let categorySpan = document.createElement('span');
        switch(cate){
            case `Làm việc`: categorySpan.className = 'task-list__card__category px-2 py-1 bg-blue-300 text-blue-800 text-xs rounded-md font-medium'; break;
            case `Cá nhân`:categorySpan.className = 'task-list__card__category px-2 py-1 bg-green-300 text-green-800 text-xs rounded-md font-medium'; break;
            case `Sức khỏe`:categorySpan.className = 'task-list__card__category px-2 py-1 bg-pink-300 text-pink-800 text-xs rounded-md font-medium'; break;
            case `Học tập`:categorySpan.className = 'task-list__card__category px-2 py-1 bg-orange-300 text-orange-800 text-xs rounded-md font-medium'; break;
            case `Khác`:categorySpan.className = 'task-list__card__category px-2 py-1 bg-gray-300 text-gray-800 text-xs rounded-md font-medium'; break;
        }
        categorySpan.textContent = cate;

        let removeBtn = document.createElement(`button`);
        removeBtn.className = `task-list__card__remove text-xs font-medium ml-2 cursor-pointer bg-[#fefcff] dark:bg-[#11131a] hover:text-red-500 border px-2 py-1 rounded-md
        transition-all ease-in duration-200`;
        removeBtn.type = `button`;
        removeBtn.addEventListener(`click` , () => {removeTaskById(idTask)});

        let trashIcon = document.createElement('i');
        trashIcon.className = 'fa-regular fa-trash-can';
        removeBtn.appendChild(trashIcon)

        let timeSpan = document.createElement('span');
        timeSpan.className = 'task-list__card__time text-red-500 text-xs font-medium absolute right-5 bottom-5';

        let clockIcon = document.createElement('i');
        clockIcon.className = 'fa-regular fa-clock mr-1';
        timeSpan.appendChild(clockIcon);

        function formatRemaining(dateString) {
            const today = new Date();
            today.setHours(0,0,0,0);
            const target = new Date(dateString);
            target.setHours(0,0,0,0);
            
            if (target < today) return "Đã quá hạn";
            
            let years = target.getFullYear() - today.getFullYear();
            let months = target.getMonth() - today.getMonth();
            let days = target.getDate() - today.getDate();
            
            if (days < 0) {
                months--;
                const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }
            
            const parts = [];
            if (years > 0) parts.push(`${years} năm`);
            if (months > 0) parts.push(`${months} tháng`);
            if (days > 0) parts.push(`${days} ngày`);
            
            return parts.length ? `Còn ${parts.join(' ')}` : "Hạn là hôm nay";
        }
        let timeShow = formatRemaining(time);
        timeSpan.appendChild(document.createTextNode(timeShow));

        if(!expiry){
            card.classList.add(`opacity-50`);
            checkboxLabel.classList.add(`pointer-events-none`);
            checkboxInput.classList.add(`pointer-events-none`); 
        }

        contentDiv.appendChild(titleShow);
        contentDiv.appendChild(description);
        contentDiv.appendChild(categorySpan);
        contentDiv.appendChild(removeBtn);
        contentDiv.appendChild(timeSpan);

        // Ghép card
        card.appendChild(checkboxDiv);
        card.appendChild(contentDiv);

        return card;
        
    }

    function createPageShow(){
        let taskHeader = document.createElement(`div`);
        taskHeader.className = `tasks-header flex m-3 gap-2 relative`;
        
        let taskHeaderTitle = document.createElement(`h2`);
        taskHeaderTitle.className = `tasks-header__title text-2xl font-bold me-auto`;
        taskHeaderTitle.textContent = `Danh sách công việc`;
        taskHeader.appendChild(taskHeaderTitle);

        let taskHeaderSearch = document.createElement(`input`);
        taskHeaderSearch.className = `tasks-header__search outline-0 dark:bg-[#11131a] bg-[#fefcff] text-Neutral rounded-2xl text-xs dark:text-[#e1e2eb] px-2 w-1/3 border-2 border-Secondary/20 
        focus:border-Primary transition-all duration-200 ease-in`;
        taskHeaderSearch.setAttribute(`type`, `text`);
        taskHeaderSearch.setAttribute(`placeholder`, `Tìm kiếm công việc...`);
        taskHeaderSearch.addEventListener(`input` , (e) => {
            searchByKeyword(e.target.value);
        })
        taskHeader.appendChild(taskHeaderSearch);

        let taskHeaderAdd = document.createElement(`button`);
        taskHeaderAdd.className = `tasks-header__add cursor-pointer rounded-2xl text-xs bg-Primary px-4 py-2 text-[#fefcff]`;
        taskHeaderAdd.textContent = `Thêm công việc`;
        let taskIcon = document.createElement(`i`);
        taskIcon.className = `fa-solid fa-plus ml-2`;
        taskHeaderAdd.appendChild(taskIcon);
        taskHeader.appendChild(taskHeaderAdd);
        taskHeaderAdd.addEventListener('click', () => {
            renderAddPage();
        });
        
        let blockNotification = document.createElement(`div`);
        blockNotification.className = `tasks-header__notification-block absolute right-1 top-12 w-120 bg-Primary text-[#fefcff] rounded-md shadow-lg p-4 hidden z-10`;
        let notificationTitle = document.createElement(`h3`);
        notificationTitle.className = `text-sm font-bold mb-2`;
        notificationTitle.textContent = `Thông báo`;
        blockNotification.appendChild(notificationTitle);
        let notificationContent = document.createElement(`p`);
        notificationContent.className = `text-xs text-[#fefcff]`;
        if(tasksExpiry.length === 0){   
            notificationContent.textContent = `Không có công việc nào quá hạn!`;
        } else {
            let listExpiry = document.createElement(`ul`);
            listExpiry.className = `text-xs text-[#fefcff]`;
            tasksExpiry.forEach(task => {
                let taskExpiry = document.createElement(`div`);
                taskExpiry.className = `flex items-center mb-1`;

                let icon = document.createElement(`i`);
                icon.className = `fa-solid ${task[`completed`] ? 'fa-check-circle text-green-500' : 'fa-circle-exclamation text-red-500'}  mr-1`;
                taskExpiry.appendChild(icon);

                let item = document.createElement(`li`);
                item.textContent = `${task[`completed`] ? 'Bạn đã hoàn thành' : 'Bạn chưa hoàn thành'} công việc "${task[`title`]}" đã quá hạn !`;
                taskExpiry.appendChild(item);
                listExpiry.appendChild(taskExpiry);
            });
            notificationContent.appendChild(listExpiry);

        }
        blockNotification.appendChild(notificationContent);
        taskHeader.appendChild(blockNotification);

        let taskHeaderNotification = document.createElement(`button`);
        taskHeaderNotification.className = `tasks-header__notification cursor-pointer rounded-2xl text-xs bg-Primary px-4 py-2 text-[#fefcff]`;
        let notificationIcon = document.createElement(`i`);
        notificationIcon.className = `fa-solid fa-bell`;
        taskHeaderNotification.appendChild(notificationIcon);
        taskHeaderNotification.addEventListener('click', () => {
            let blockNotification = document.querySelector(`.tasks-header__notification-block`);
            blockNotification.classList.toggle(`hidden`);
            showTaskExpiryOnNofi();
        });
        taskHeader.appendChild(taskHeaderNotification);
        let notificationBadge = document.createElement(`span`);
        notificationBadge.className = `tasks-header__notification-badge absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center ${tasksExpiry.length > 0 ? '' : 'hidden'}`;
        notificationBadge.textContent = tasksExpiry.length;
        taskHeaderNotification.appendChild(notificationBadge);

        tasksShow.appendChild(taskHeader);

        // phần filter
        let filter = document.createElement(`div`);
        filter.className = `tasks-filter inline-flex mt-3 gap-5 bg-[#fefcff] dark:bg-[#11131a] rounded-2xl`;
        
        let filterAll = document.createElement(`button`);
        filterAll.className = `tasks-filter__all px-4 py-3  text-xs rounded-2xl cursor-pointer  transition-all duration-200 ease-in`; 
        filterAll.textContent = `Tất cả`;
        filterAll.addEventListener(`click` , () =>{
            changeStateList(`All`);
        })

        let filterUnfinished = document.createElement(`button`);
        filterUnfinished.className = `tasks-filter__work px-4 py-3 text-xs rounded-2xl cursor-pointer transition-all duration-200 ease-in`; 
        filterUnfinished.textContent = `Chưa hoàn thành`;
        filterUnfinished.addEventListener(`click` , () =>{
            changeStateList(`Unfinished`);
        })

        let filterFinished = document.createElement(`button`);
        filterFinished.className = `tasks-filter__finished px-4 py-3 text-xs rounded-2xl cursor-pointer transition-all duration-200 ease-in`;
        filterFinished.textContent = `Đã hoàn thành`;
        filterFinished.addEventListener(`click` , () =>{
            changeStateList(`Finished`);
        })

        if(tasksState === `All`){
            filterAll.classList.add(`bg-Primary`);
            filterUnfinished.classList.remove(`bg-Primary`);
            filterFinished.classList.remove(`bg-Primary`);
        }
        if(tasksState === `Finished`){
            filterAll.classList.remove(`bg-Primary`);
            filterUnfinished.classList.remove(`bg-Primary`);
            filterFinished.classList.add(`bg-Primary`);
        } 
        if(tasksState === `Unfinished`){
            filterAll.classList.remove(`bg-Primary`);
            filterUnfinished.classList.add(`bg-Primary`);
            filterFinished.classList.remove(`bg-Primary`);
        }

        filter.appendChild(filterAll);
        filter.appendChild(filterUnfinished);
        filter.appendChild(filterFinished);
        tasksShow.appendChild(filter);

        // phần task list
        let taskList = document.createElement(`div`);
        taskList.className = `tasks-list mt-3 grid  grid-cols-2 gap-4`;

        let tasksFilter = [...tasks];
        if(tasksState === `Unfinished`) tasksFilter = tasksFilter.filter(value => value[`completed`] === false);
        if(tasksState === `Finished`) tasksFilter = tasksFilter.filter(value => value[`completed`] === true);
        if(tasksKeyword.trim() !== ``) tasksFilter = tasksFilter.filter(value => value[`title`].includes(tasksKeyword.trim()));     
        
        for(let task of tasksFilter){
            taskList.appendChild(createCardTask(task[`id`] , task[`completed`] , task[`title`] , task[`description`] , task[`category`] , task[`time`] , task[`expiry`]));
            tasksShow.appendChild(taskList);
        }
        tasksShow.appendChild(taskList);
    }

    function addTask(newTask){
        tasks.push(newTask);
        renderListPage();
        saveToLocalStorage();
    }

    // hàm render danh sách công việc
    function renderListTask(){
        let taskList = document.querySelector(`.tasks-list`);
        taskList.innerHTML = ``;

        let tasksFilter = [...tasks];
        if(tasksState === `Unfinished`) tasksFilter = tasksFilter.filter(value => value[`completed`] === false);
        if(tasksState === `Finished`) tasksFilter = tasksFilter.filter(value => value[`completed`] === true);
        if(tasksKeyword.trim() !== ``) tasksFilter = tasksFilter.filter(value => value[`title`].toLowerCase().includes(tasksKeyword.trim().toLowerCase()));
        
        let filterAll = document.querySelector(`.tasks-filter__all`);
        let filterUnfinished = document.querySelector(`.tasks-filter__work`);
        let filterFinished = document.querySelector(`.tasks-filter__finished`);
        if(tasksState === `All`){
            filterAll.classList.add(`bg-Primary`);
            filterUnfinished.classList.remove(`bg-Primary`);
            filterFinished.classList.remove(`bg-Primary`);
        }
        if(tasksState === `Finished`){
            filterAll.classList.remove(`bg-Primary`);
            filterUnfinished.classList.remove(`bg-Primary`);
            filterFinished.classList.add(`bg-Primary`);
        } 
        if(tasksState === `Unfinished`){
            filterAll.classList.remove(`bg-Primary`);
            filterUnfinished.classList.add(`bg-Primary`);
            filterFinished.classList.remove(`bg-Primary`);
        }

        if(tasksFilter.length === 0){
            let warning = document.createElement(`p`);
            warning.textContent = `Khum tồn tại công việc nào ở đây @_@`;
            warning.className = `p-5 text-sm text-red-500 font-medium`;
            taskList.appendChild(warning);
        }else{
            for(let task of tasksFilter){
                taskList.appendChild(createCardTask(task[`id`] , task[`completed`] , task[`title`] , task[`description`] , task[`category`] , task[`time`] , task[`expiry`]));
            }
        }
        saveToLocalStorage();
    }

    function removeTaskById(idTask){
        let pos = tasks.findIndex(task => task[`id`] === idTask);
        if(pos !== -1) tasks.splice(pos , 1);
        renderListTask();
    }

    function changeCompleted(idTask){
        let pos = tasks.findIndex(task => task[`id`] === idTask);
        if(pos !== -1) tasks[pos][`completed`] = !tasks[pos][`completed`];
        renderListTask();
    }

    function changeStateList(state){
        tasksState = state;
        renderListTask();
    }

    function searchByKeyword(keyword){
        tasksKeyword = keyword;
        renderListTask();
    }

    function updateAllExpiry(){
        for(let task of tasks){
            if(task[`expiry`] === true){
                let today = new Date();
                let taskTime = new Date(task[`time`]);
                taskTime.setHours(24, 0, 0, 0);
                if(taskTime < today){
                    task[`expiry`] = false;
                }
            }
        }
    }

    function showTaskExpiryOnNofi(){
        for(let task of tasks){
            let pos = tasksExpiry.findIndex(t => t[`id`] === task[`id`]);
            if(pos === -1 && task[`expiry`] === false){
                tasksExpiry.push(task);
            }
        }
    }
    
// render page thêm công việc
    const btnAdd = document.querySelector(`.tasks-header__add`);
    btnAdd.addEventListener(`click` , () => {
        renderAddPage();
    })

    function renderAddPage(){
        tasksShow.innerHTML = ``;
        createPageTask();
    }

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
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;
        inputTime.min = todayStr;

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
        addBtn.addEventListener('click', () => {
            if(inputTitle.value.trim() === `` || textarea.value.trim() === `` || inputTime.value.trim() === ``){
                let warning = document.querySelector(`.tasks-form__warning`);
                if(!warning){
                    warning = document.createElement(`p`);
                    warning.className = `tasks-form__warning text-sm text-red-500 font-medium`;
                    warning.textContent = `Tiêu đề, mô tả và thời hạn không được để trống!`;
                    leftContent.appendChild(warning);
                }
                return;
            }
            let newTask = {
                id : tasks.length + 1,
                completed : false,
                title: inputTitle.value,
                description: textarea.value,
                category: select.value,
                time: inputTime.value,
                expiry: true
            };
            addTask(newTask);
        });

        let cancelBtn = document.createElement('button');
        cancelBtn.className = 'task-form__btn__cancel bg-red-500 cursor-pointer text-sm text-[#fefcff] px-4 py-2 rounded-md';
        cancelBtn.setAttribute('type', 'button');
        cancelBtn.textContent = 'Hủy';
        cancelBtn.addEventListener('click', () => {
            renderListPage();
        });

        btnDiv.appendChild(addBtn);
        btnDiv.appendChild(cancelBtn);

        rightWrapper.appendChild(detailDiv);
        rightWrapper.appendChild(btnDiv);

        tasksForm.appendChild(leftContent);
        tasksForm.appendChild(rightWrapper);

        // Gắn toàn bộ form vào container tasksShow 
        tasksShow.appendChild(tasksForm);
    }

// các hàm localStorage 
    function saveToLocalStorage(){
        localStorage.setItem(`listTask` , JSON.stringify(tasks));
    }

    function loadToLocalStorage(){
        let arrLocal = localStorage.getItem(`listTask`);
        tasks = JSON.parse(arrLocal);
        updateAllExpiry();
        showTaskExpiryOnNofi();
        renderListPage();
    }


// gọi render page danh sách công việc lần đầu 

    loadToLocalStorage();
    
