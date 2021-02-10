<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  name: "GMap",
  props: {
    center: { lat: Number, lng: Number },
    zoom: Number,
    mapType: String,
    disableUI: Boolean,
    markers: Array,
    mapDidLoad: Function
  },
  setup(props) {
    // the google map object
    const map = ref(null);

    // the map element in the templste
    const mapDivRef = ref(null);

    //markers on the map
    let currentMarkers = [];

    // load in the google script
    onMounted(() => {
   
      

      // create the script element to load
      const googleMapScript = document.createElement("SCRIPT");
      googleMapScript.setAttribute(
        "src",
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyCt1tYSTtXbI0hWlZ2fr4xRG5R5sIhwU4o&callback=initMap`
      );
      googleMapScript.setAttribute("defer", "");
      googleMapScript.setAttribute("async", "");
      document.head.appendChild(googleMapScript);
    });





    /**
     * this function is called as soon as the map is initialized
     */
    

    const clearMarkers = () => {
        currentMarkers.forEach(m => {
            m.map = null;
        })
        currentMarkers = []
    }


    //calc bounds




    //load all markers
    const loadMapMarkers = () => {
        if(!props.markers.length) return;

        // always clear before loading...
        clearMarkers()

        props.markers.forEach(markerInfo =>{
                const mapMarker = new window.google.maps.Marker({
                position: new window.google.maps.LatLng(
                    markerInfo.lat, 
                    markerInfo.lng
                    ),
                    map: map.value,
                    title: markerInfo.title

            });

            console.log(markerInfo);
            //info window
             mapMarker.infoWindow = new window.google.maps.InfoWindow({
                content: markerInfo.title
            })

            mapMarker.addListener('click', mapEvent => {
                if (mapMarker.infoWindow !== null) {
                    mapMarker.infoWindow.open(map.value, mapMarker)
                }
            })
            // add to local markers
            currentMarkers.push(mapMarker);
        });

    };

        //need to watch the properties
    watch(
        () => props.markers,
        
        () => {
            loadMapMarkers();
        }
    )

    



    window.initMap = () => {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || "hybrid",
        zoom: props.zoom || 8,
        disableDefaultUI: props.disableUI || false,
        center: props.center || { lat: 51.1657, lng: 10.4515 }
      });

      loadMapMarkers();

      

      props.mapDidLoad && props.mapDidLoad(map, window.google.maps)
    }

    return {
      mapDivRef
    };
  }
};
</script>

<style lang="css" scoped>
.map {
  width: 100%;
  height: 400px;
  background-color: azure;
}
</style>