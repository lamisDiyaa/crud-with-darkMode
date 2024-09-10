let productName=document.getElementById("product_name")
let productPrice=document.getElementById("product_price")
let productCateg=document.getElementById("product_category")
let productCount=document.getElementById("count")
let addButtob=document.getElementById("add")
let body=document.getElementById("tbody")
let foot=document.getElementById("tfoot")
let html=document.querySelector("html")
let mood=document.getElementById("mood")
let icon=document.getElementById("icon")
let listOfProducts=[]
let index;
let itemStatus="addNewIem"
let totalPrice
let regEx=/^[a-zA-z]/
let regEx2=/^[0-9]{1,100000000}$/

if(localStorage.getItem("product") === null){
    listOfProducts=[]
    }else{
    listOfProducts=JSON.parse(localStorage.getItem("product"))
    foot.innerHTML= totalPrice?`total price is${totalPrice}`:`total price is ${JSON.parse(localStorage.getItem("TOTAL"))}`
    displayProducts()
    }


 





addButtob.addEventListener("click",function(e){
    let productObj={
        Id:Date.now(),
        name:productName.value,
        price:productPrice.value,
        category:productCateg.value,
        count:productCount.value,
        total:+productPrice.value*+productCount.value
    }
    if(regEx.test(productName.value)&& regEx2.test(productPrice.value)&& regEx.test(productCateg.value) && regEx2.test(productCount.value)){
        if(itemStatus=="addNewIem"){
            listOfProducts.push(productObj)
            localStorage.setItem("product",JSON.stringify(listOfProducts))
            console.log(listOfProducts)
            totalSum()
            displayProducts()
            clear()
        }else if(itemStatus=="update"){
            listOfProducts[index].name=productName.value
            listOfProducts[index].price=productPrice.value
            listOfProducts[index].category=productCateg.value
            listOfProducts[index].count=productCount.value
            localStorage.setItem("product",JSON.stringify(listOfProducts))
            console.log("index"+index)
            totalSum()
            displayProducts()
            clear()
        }
    }else{
       e.preventDefault()
    }
   
    
  
})


function displayProducts(){
    let displayObj=""
    for(var i=0;i<listOfProducts.length;i++){
        displayObj+=
        `   <tr class="">
                <td class="text-center  body-content">${i+1}</td>
                <td class="text-center body-content">${listOfProducts[i].name}</td>
                <td class="text-center body-content">${listOfProducts[i].price}</td>
                <td class="text-center body-content ">${listOfProducts[i].category}</td>
                <td class="text-center body-content "><span class="mini_btn" onclick="increaseCount(${listOfProducts[i].Id})">+</span>
                <span class="custom-text"> ${listOfProducts[i].count}</span>
               
                <span class="mini_btn " onclick="decreaseCount(${listOfProducts[i].Id})">-</span>
                </td>
                <td class="text-center body-content">${+listOfProducts[i].count*+listOfProducts[i].price}</td>
                <td class="text-center body-content"><button class="btn custom-btn text-white" onclick=deleteOneItem(${listOfProducts[i].Id})>delete</button></td>
                <td class="text-center body-content"><button class="btn custom-btn text-white" onclick=updateItem(${listOfProducts[i].Id})>update</button></td>
            </tr>
        `
        
    }
    body.innerHTML=displayObj
    
   

}

function deleteAll(){
    listOfProducts.splice(0)
    localStorage.setItem("product",JSON.stringify(listOfProducts))
    totalSum()
    displayProducts()
}




function deleteOneItem(id){
    let selectedItem=listOfProducts.find(function(elem){
        return elem.Id ===id
    })
    if(selectedItem.count>1){
        selectedItem.count--
        selectedItem.total-=selectedItem.price
        localStorage.setItem("product",JSON.stringify(listOfProducts))
        totalSum()
        displayProducts()
      
    }else if(selectedItem.count==1 ){
        let newList=listOfProducts.filter(function(ele){
        return ele.Id !==id
    })
    listOfProducts=newList
    localStorage.setItem("product",JSON.stringify(listOfProducts))
    totalSum()
    displayProducts()
   
   
    

    }
   
    
}
function increaseCount(id){
    let increasedItem=listOfProducts.find(function(ele){
        return ele.Id === id
    })
    increasedItem.count++
    localStorage.setItem("product",JSON.stringify(listOfProducts))
    totalSum()
    displayProducts()
}


function decreaseCount(id){
    let decreasedItem=listOfProducts.find(function(ele){
        return ele.Id === id
    })
    
    
    if(decreasedItem.count==1){
        let newList=listOfProducts.filter(function(ele){
            return ele.Id !==id
        })
        listOfProducts=newList
    }
    decreasedItem.count--
    
    localStorage.setItem("product",JSON.stringify(listOfProducts))
    totalSum()
    displayProducts()
}


function totalSum(){
    let newList=[]
    listOfProducts.forEach(function(ele){
        newList.push(ele.price*ele.count) 
    })
    totalPrice=newList.reduce(function(acc,nex){
        return acc+nex
    },0)
    localStorage.setItem("product",JSON.stringify(listOfProducts))
    localStorage.setItem("TOTAL",JSON.stringify(totalPrice))
    foot.innerHTML= totalPrice?`total price is${totalPrice}`:`total price is ${JSON.parse(localStorage.getItem("TOTAL"))}`
     displayProducts()
    
}


function updateItem(id){
    let itemindex=listOfProducts.findIndex(function(elem){
        return elem.Id === id
    })
    let item=listOfProducts.find(function(elem){
        return elem.Id === id
    })
    productName.value=item.name
    productPrice.value=item.price
    productCateg.value=item.category
    productCount.value=item.count

    index=itemindex
    itemStatus="update"
}


function clear(){
    productName.value=" "
    productPrice.value=" "
    productCateg.value=" "
    productCount.value=" "
}



////dark mood

if(localStorage.getItem("data-theme")){
    html.setAttribute("data-theme",localStorage.getItem("data-theme"))
    icon.textContent=`${localStorage.getItem("icon")}`
}


mood.addEventListener("click",function(){
    if(html.getAttribute("data-theme")=="light"){
        html.setAttribute("data-theme","dark")
        localStorage.setItem("data-theme","dark")
        icon.textContent="dark_mode"
        localStorage.setItem("icon","dark_mode")
    }else{
        html.setAttribute("data-theme","light")
        localStorage.setItem("data-theme","light")
        icon.textContent="light_mode"
        localStorage.setItem("icon","light_mode ")
    }
})



