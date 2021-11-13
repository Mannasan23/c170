AFRAME.registerComponent('marker-handler', {
    init: function() {
         //get the dishes collection from firestore database
    var dishes = await this.getDishes();

    //markerFound event
    this.el.addEventListener("markerFound", () => {
      var markerId = this.el.id;      
      this.handleMarkerFound(dishes, markerId);
    });

    //markerLost event
    this.el.addEventListener("markerLost", () => {
      this.handleMarkerLost();
    });
    },
    handleMarkerFound: function(dishes, markerId) {
        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "flex"

        var rateButton = document.getElementById("rating-button")
        var orderButton = document.getElementById("order-button")
        
        rateButton.addEventListener('click', ()=> {
            swal({
                icon: "warning",
                title: "Rate Dish",
                text: "Work In Progress"
            });
        })

        orderButton.addEventListener('click', ()=> {
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "Thanks for Order!",
                text: "Your Order will be served soon at your table."
            });
        })
        // Changing Model scale to initial scale
        var dish = dishes.filter(dish => dish.id === markerId)[0];

        var model = document.querySelector(`#model-${dish.id}`);
        model.setAttribute("position", dish.marker_geometry.position);
        model.setAttribute("rotation", dish.marker_geometry.rotation);
        model.setAttribute("scale", dish.marker_geometry.scale);
    },
    handleMarkerLost: function() {
        var buttonDiv = document.getElementById("button-div")
        buttonDiv.style.display = "none"
    },
    getDishes: async function () {
        return await firebase
          .firestore()
          .collection("dishes")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
      }
})