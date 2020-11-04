var Dish = [];
    var Qt = [];
    var Price = [];
    var Cost =[];
    var Qtresult =[];
    var Priceresult =[];
    var DishList = [];

    var TotalBill=0;
    var i,j;
    document.getElementById("points").defaultValue = "0";

        function addTocart (x,y,z) {
          var count=0;

          for(i=0;i<Dish.length;i++){
            if(Dish[i]==x){
              count=count+1;
                Qt[i]=parseInt(Qt[i]);
                var incre = parseInt(y);
                Qt[i]=Qt[i]+incre;
                Qt[i].toString();

            }
          }
          if(count==0){
            Dish.push(x);
            Qt.push(y);
            Price.push(z);
          }

    console.log(Dish);
    Qtresult = Qt.map(function (x) {
      return parseInt(x, 10);
    });
    console.log(Qtresult);
    Priceresult = Price.map(function (x) {
      return parseInt(x, 10);
    });
    console.log(Priceresult);

    for (i=0;i<Qtresult.length;i++){
      Cost[i]=Qtresult[i]*Priceresult[i];
    }
    console.log(Cost);
    TotalBill=0;
    for( i=0; i<Cost.length; i++){

      TotalBill=TotalBill+Cost[i];
    }
    console.log("TOTAL BILL: ",TotalBill);

    text = "<ul>";
    Dish.forEach(myFunction);
    text += "</ul>";
    document.getElementById("OrderedDish").innerHTML = text;

    text = "<ul >";
    Qtresult.forEach(myFunction);
    text += "</ul>";
    document.getElementById("OrderedDishQt").innerHTML =  text;

    text = "<ul>";
    Priceresult.forEach(myFunction);
    text += "</ul>";
    document.getElementById("OrderedDishPrice").innerHTML = text;

    text = "<ul>";
    Cost.forEach(myFunction);
    text += "</ul>";
    document.getElementById("OrderedDishCost").innerHTML = text;

    document.getElementById("Totalcost").innerHTML = TotalBill;

    function myFunction(value) {
      text += "<li>" + value + "</li>";
    } 
    

    // document.getElementById("OrderedDish").innerHTML += "<li>"+Dish[Dish.length-1]+"</li>";
    // document.getElementById("OrderedDishQt").innerHTML += "<li>"+Qtresult[Qtresult.length-1]+"</li>";
    // document.getElementById("OrderedDishPrice").innerHTML += "<li>"+Priceresult[Priceresult.length-1]+"</li>";
    // document.getElementById("OrderedDishCost").innerHTML += "<li>"+Cost[Cost.length-1]+"</li>";
    


  }
console.log(Dish);

  function showbill(){
    var text = "<ul>";
    Dish.forEach(myFunction);
    text += "</ul>";
    var text1 = "<ul>";
    Qtresult.forEach(myFunction);
    text1 += "</ul>";
    var text2 = "<ul>";
    Priceresult.forEach(myFunction);
    text2 += "</ul>";
    var text3 = "<ul>";
    Cost.forEach(myFunction);
    text3 += "</ul>";
    document.getElementById("OrderedDish").innerHTML = text;
    document.getElementById("OrderedDishQt").innerHTML =  text1;
    document.getElementById("OrderedDishPrice").innerHTML = text2;
    document.getElementById("OrderedDishCost").innerHTML = text3;
    document.getElementById("Totalcost").innerHTML = TotalBill;
    function myFunction(value) {
      text += "<li>" + value + "</li>";
    } 
  }

    

