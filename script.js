let records=JSON.parse(localStorage.getItem('myRecords'))||[];
let selectedCategory="";

window.onload=function(){
    refreshTable();
}

function refreshTable() {
    const listContainer = document.getElementById('RecordList');
    const totalDisplay = document.getElementById('TotalAmount');
    
    listContainer.innerHTML = "";

    let total = 0;

    // 2. 循环数组生成卡片 HTML
    records.forEach((item, index) => {
        // 创建卡
        const card = document.createElement('div');
        card.className = 'record-card';

        // 填充内部 HTML (完全按照你图片中的结构)
        card.innerHTML = `
            <div class="card-left">
                <span class="card-category">${item.category}</span>
                <span class="card-date">${item.date}</span>
            </div>
            <div class="card-right">
                <span class="card-amount">-${item.amount.toFixed(2)}</span>
                <button class="delete-btn" onclick="deleteRecord(${index})">×</button>
            </div>
        `;

        listContainer.appendChild(card);
        total += item.amount;
    });
    totalDisplay.innerText = "¥" + total.toFixed(2);
}

function deleteRecord(index) {
    if(confirm("确定要删除这笔记录吗？")) {
        records.splice(index, 1); // 从数组中移除
        localStorage.setItem('myRecords', JSON.stringify(records)); // 更新本地存储
        refreshTable(); // 重新绘图
    }
}

function selectCategory(element,name){
    const items=document.querySelectorAll('.Category-item');
    items.forEach(item=>item.classList.remove('active'));
    element.classList.add('active');
    selectedCategory=name;
}

window.onload=function(){
    records.forEach(item=>{
        renderRow(item.date,item.category,item.amount);
        total+=item.amount;
    });
    document.getElementById('TotalAmount').innerText="¥"+total.toFixed(2);
};

function AddClickbutton(){
    const date=document.getElementById('Dateinput').value;
    const amountStr=document.getElementById('Amountinput').value;
    
    if(!date||!amountStr||!selectedCategory){
        alert("请输入完整信息");
        return;
    }
   
    const amount=parseFloat(amountStr);   

    records.push({date,category:selectedCategory,amount});
    localStorage.setItem('myRecords',JSON.stringify(records));

    document.getElementById('Amountinput').value="";
    //selectedCategory="";
    document.querySelectorAll('.Category-item').forEach(item=>item.classList.remove('active'));
    
    refreshTable();
}