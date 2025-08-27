const fs=require('fs');
const path=require('path');

loadUsers=()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname,'data','users.json')));
}

loadStudents=()=>{
    return JSON.parse(fs.readFileSync(path.join(__dirname,'data','students.json')));
}

saveUsers=(users)=>{
    fs.writeFileSync(path.join(__dirname,'data','users.json'),JSON.stringify(users));
}

saveStudents=(students)=>{
    fs.writeFileSync(path.join(__dirname,'data','students.json'),JSON.stringify(students));
}

function loadLoggedInUser() {
  const loggedInUser = JSON.parse(fs.readFileSync(path.join(__dirname,'data','loggedInUser.json'), "utf-8"));
  if (!loggedInUser) return null;
  return loggedInUser;
}

function saveLoggedInUser(user) {
  fs.writeFileSync(path.join(__dirname,'data','loggedInUser.json'), JSON.stringify(user));
}
module.exports={loadUsers, loadStudents, saveUsers, saveStudents, loadLoggedInUser, saveLoggedInUser};