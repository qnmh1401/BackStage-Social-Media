const favoriteBtn = document.getElementById('favorite-btn')
// function clickBtn(){
//     if(favoriteBtn.style="color:black"){
//         favoriteBtn.style="color:red"
//     }else{
//         favoriteBtn.style="color:black"
//     }
// }
// favoriteBtn.addEventListener("change",  clickBtn)
// clickBtn(favoriteBtn)


// console.log(favoriteBtn)
// const changeBgColor = (ev) => {
//     ev.currentTarget.style="color: red"
//   };
//   const EL_cards = document.querySelectorAll(".favorite");
//   EL_cards.forEach(EL => EL.addEventListener("click", changeBgColor));

//   console.log(EL_cards)

favoriteBtn.addEventListener("change", function (favoriteBtn) {
    console.log(favoriteBtn)
    if (this.style="color:black") {
      this.style="color:red"
    } else {
        this.style="color:black"
    }
  });




  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }
document.getElementById('create-btn').addEventListener('click', openForm)
document.getElementById('close-btn').addEventListener('click', closeForm)

  
function postAndClose(){
  document.getElementById("myForm").style.display = "none";
}
document.getElementById('post-submit').addEventListener('click', postAndClose)