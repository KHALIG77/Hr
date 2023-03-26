const selects = document.querySelector("#myOption");
const tBody = document.querySelector(".t-body");
const sortId = document.querySelector(".sort-id");
const sortName = document.querySelector(".sort-name");
const sortSurname = document.querySelector(".sort-surname");
const sortSalary = document.querySelector(".sort-salary");
const inputSearch = document.querySelector(".input-search");
const sortPositions = document.querySelector(".sort-position");
const minSalary = document.querySelector(".min-salary");
const maxSalary = document.querySelector(".max-salary");
const salaryFilterBtn = document.querySelector(".salary-filter-btn");
const salaryResetBtn = document.querySelector(".salary-reset-btn");
const filterSelect = document.querySelector("#myFilter");
const addBtn = document.querySelector(".add-btn");
const sectionInfo = document.querySelector("#person-info")
 

const users = [];
const searchArr = [];



function sectionInfoVisible(){
if(users.length>0){
  sectionInfo.classList.remove("d-none")
}
}


addPerson()

function addPerson(){
  let selectedCheck = "";
selects.addEventListener("click", function () {
  let selectedOption = selects.options[selects.selectedIndex];
  let selectedValue = selectedOption.value;
  selectedCheck = selectedValue;
});

  addBtn.addEventListener("click", function () {
    // e.preventDefault();
  
    const user = {
      Id: 0,
      Name: "",
      Surname: "",
      Salary: 0,
      Position: "",
    };
    let userName = document.querySelector(".user-name").value;
    let userSurname = document.querySelector(".user-surname").value;
    let userSalary = document.querySelector(".user-salary").value;
    userSalary = Number(userSalary);
   
    user.Name = userName;
    user.Surname = userSurname;
    user.Salary = userSalary;
    user.Position = selectedCheck;
    if (
      userName == "" ||
      userSurname == "" ||
      userSalary == "" ||
      user.Position == ""
    ) {
      //Object.values(user).some() nan yazdim hemise false qaytardi
      alert("Butun melumatlari doldurun");
    } else {
       if(users.length>0){
        user.Id =  users[users.length-1].Id+1
        console.log(users.length)
        users.push(user);
         addTable(user);
         sectionInfoVisible()
         editData();

        
       }
       else{
        user.Id = 1
        users.push(user);
        addTable(user);
        sectionInfoVisible()
        editData();
       }
    }
  });
}


function addTable(item) {
  tBody.innerHTML +=
    '<tr id="' +
    item.Id +
    '"><td class = "id">' +
    item.Id +
    '</td><td class = "name">' +
    item.Name +
    '</td><td class ="surname">' +
    item.Surname +
    '</td><td class = "salary">' +
    item.Salary +
    "</td><td>" +
    item.Position +
    '<button type="button" id="' +
    item.Id +
    '" style="padding:10px;background-color:red;float:right;" onclick="deleteFunc(\'' +
    item.Id +
    "')\">Delete</button></td></tr>";
}

idSorting();
function idSorting() {
  sortId.addEventListener("click", function () {
    sortId.classList.toggle("test");

    if (!sortId.classList.contains("test")) {
      users.sort(function (a, b) {
        return b.Id - a.Id;
      });

      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      users.sort(function (a, b) {
        return a.Id - b.Id;
      });

      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

salarySorting();

function salarySorting() {
  sortSalary.addEventListener("click", function () {
    sortSalary.classList.toggle("test");

    if (!sortSalary.classList.contains("test")) {
      users.sort(function (a, b) {
        console.log(typeof a.Salary);
        return b.Salary - a.Salary;
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      users.sort(function (a, b) {
        return a.Salary - b.Salary;
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

nameSorting();

function nameSorting() {
  sortName.addEventListener("click", function () {
    sortName.classList.toggle("test");

    if (!sortName.classList.contains("test")) {
      users.sort(function (a, b) {
        if (b.Name > a.Name) {
          return -1;
        }
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      tBody.innerHTML = "";
      users.reverse();
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

surnameSorting();

function surnameSorting() {
  sortSurname.addEventListener("click", function () {
    sortSurname.classList.toggle("test");

    if (!sortSurname.classList.contains("test")) {
      users.sort(function (a, b) {
        if (b.Surname > a.Surname) {
          return -1;
        }
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      tBody.innerHTML = "";
      users.reverse();
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

sortPosition();
function sortPosition() {
  sortPositions.addEventListener("click", function () {
    sortPositions.classList.toggle("test");

    if (!sortPositions.classList.contains("test")) {
      users.sort(function (a, b) {
        if (b.Position > a.Position) {
          return -1;
        }
      });
      tBody.innerHTML = "";
      users.forEach(function (user) {
        addTable(user);
      });
    } else {
      tBody.innerHTML = "";
      users.reverse();
      users.forEach(function (user) {
        addTable(user);
      });
    }
  });
}

function deleteFunc(id) {
  id = Number(id);

  let indexId = users.findIndex(function (user) {
    return user.Id == id;
  });
  users.splice(indexId, 1);

  tBody.innerHTML = "";
  users.forEach(function (user) {
    addTable(user);
  });
}

searchFunc();

function searchFunc() {
  inputSearch.addEventListener("keyup", function () {
    let rows = document.querySelectorAll("tr");
    rows.forEach(function (row) {
      let text = row.textContent.toLowerCase();
      if (text.includes(inputSearch.value.toLowerCase())) {
        row.classList.remove("d-none");
      } else {
        row.classList.add("d-none");
      }
    });
  });
}

salaryFilterBtn.addEventListener("click", function () {
  salaryFilter();
});

resetSalaryFilter();

function resetSalaryFilter() {
  salaryResetBtn.addEventListener("click", function () {
    tBody.innerHTML = "";
    users.forEach(function (item) {
      addTable(item);
    });
  });
}
function resetFilter() {
  tBody.innerHTML = "";
  users.forEach(function (user) {
    addTable(user);
  });
}

function salaryFilter() {
  let minValue = Number(minSalary.value);
  let maxValue = Number(maxSalary.value);

  if (minValue !== 0 && maxValue == 0) {
    let filterArr = users.filter(function (user) {
      if (minValue <= user.Salary) {
        return user;
      }
    });
    tBody.innerHTML = "";
    filterArr.forEach(function (item) {
      addTable(item);
      editData();
    });
    filterArr.splice(0, filterArr.length);
  } else if (maxValue !== 0 && minValue == 0) {
    let filterArr = users.filter(function (user) {
      if (maxValue >= user.Salary) {
        return user;
      }
    });
    tBody.innerHTML = "";
    filterArr.forEach(function (item) {
      addTable(item);
      editData();
    });
    filterArr.splice(0, filterArr.length);
  } else if (maxValue !== 0 && minValue !== 0) {
    let filterArr = users.filter(function (user) {
      if (maxValue >= user.Salary && minValue <= user.Salary) {
        return user;
      }
    });
    tBody.innerHTML = "";
    filterArr.forEach(function (item) {
      addTable(item);
      editData();
    });
    filterArr.splice(0, filterArr.length);
  } else {
    resetSalaryFilter();
  }
}

positionFilter();

function positionFilter() {
  let positionCheck = "";

  filterSelect.addEventListener("change", function () {
    let filterOptions = filterSelect.options[filterSelect.selectedIndex];
    let optionValue = filterOptions.value;
    positionCheck = optionValue;

    if (optionValue === "Tester") {
      let testerArr = users.filter(function (user) {
        return user.Position == "Tester";
      });
      tBody.innerHTML = "";
      testerArr.forEach(function (user) {
        addTable(user);
      });

    
    } else if (optionValue === "Content Manager") {
      let contentArr = users.filter(function (user) {
        return user.Position == "Content Manager";
      });
      tBody.innerHTML = "";
      contentArr.forEach(function (user) {
        addTable(user);
      });

    } else if (optionValue === "Full-stack developer") {
      let developerArr = users.filter(function (user) {
        return user.Position == "Full-stack developer";
      });
      tBody.innerHTML = "";
      developerArr.forEach(function (user) {
        addTable(user);
      });
    } else if (optionValue === "Ofisiant") {
      let ofisiantArr = users.filter(function (user) {
        return user.Position == "Ofisiant";
      });
      tBody.innerHTML = "";
      ofisiantArr.forEach(function (user) {
        addTable(user);
      });
    } else {
      resetFilter();
    }
  });
}


function editData() {
  let allTd = document.querySelectorAll("td");
  allTd.forEach(function (data) {
    data.addEventListener("dblclick", function () {
      if (data.classList.contains("name")) {
        let parent = Number(data.parentNode.id);
        data.innerHTML =
          '<input type = "text" placeholder = "Write Name" class = input-name>  <button class = "edit-name">Edit</button>';
        let inputName = document.querySelector(".input-name");
        let editName = document.querySelector(".edit-name");
        editName.addEventListener("click", function () {
          data.innerText = inputName.value;

          let indexName = users.findIndex(function (user) {
            return user.Id === parent;
          });
          users[indexName].Name = inputName.value;
        });
      }
      if (data.classList.contains("surname")) {
        let parent = Number(data.parentNode.id);
        data.innerHTML =
          '<input type = "text" placeholder = "Write SurName" class = input-surname>  <button class = "edit-surname">Edit</button>';
        let inputSurname = document.querySelector(".input-surname");
        let editSurname = document.querySelector(".edit-surname");
        editSurname.addEventListener("click", function () {
          data.innerText = inputSurname.value;

          let indexSurname = users.findIndex(function (user) {
            return user.Id === parent;
          });
          users[indexSurname].Surname = inputSurname.value;
          console.log(users);
        });
      }
      if (data.classList.contains("salary")) {
        let parent = Number(data.parentNode.id);
        data.innerHTML =
          '<input type = "number" placeholder = "Write Salary" class = input-salary>  <button class = "edit-salary">Edit</button>';
        let inputSalary = document.querySelector(".input-salary");
        let editSalary = document.querySelector(".edit-salary");
        editSalary.addEventListener("click", function () {
          data.innerText = inputSalary.value;

          let indexSalary = users.findIndex(function (user) {
            return user.Id === parent;
          });
          users[indexSalary].Salary = inputSalary.value;
        });
      }
    });
  });
}