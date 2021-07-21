<template>
  <div class="center-cmp">
    <div id="control-map" style="width: 100%;height: calc(100% - 7px);margin: 0px"></div>
  </div>
</template>

<script>
  import { getToiletLocations } from '@/api/toilet';

  export default {
    data() {
      return {
        map: null,
        center: [], // 纬度,经度
        zoom: null,
        markers: [],
        markerInfos: [],

        initDataSuccess: false,
        initMapSuccess: false
      };
    },

    methods: {
      init() {
        let address = "";
        let that = this;
        var center = new qq.maps.LatLng(34.754152, 113.667636);
        var map = new qq.maps.Map(document.getElementById('map'), {
          center: center,
          zoom: 10,
          mapStyleId: 'style2'  // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
        });

        var marker = new qq.maps.Marker({
          position: center,
          map: map
        });

        var infoWin = new qq.maps.InfoWindow({
          map: map
        });

        var geocoder = new qq.maps.Geocoder({
          complete: function (res) {
            console.log(res);
            address = res.detail.nearPois[0].name;
          }
        });

        qq.maps.event.addListener(map, "click", function (event) {
          this.longitude = event.latLng.getLat();
          this.latitude = event.latLng.getLng();
          console.log(event);
          let lat = new qq.maps.LatLng(this.longitude, this.latitude);
          geocoder.getAddress(lat);

          setTimeout(() => {
            infoWin.open();
            infoWin.setContent(
              '<div style="text-align:center;white-space:nowrap;">' +
              address +
              "</div>"
            );

            infoWin.setPosition(event.latLng);

          }, 200);
        });
      },
      initMap() {
        this.map = new qq.maps.Map('control-map', {
          mapStyleId: 'style2',  // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
          zoomControl: false,
          panControl: false
        });

        var listener = qq.maps.event.addListener(this.map, 'tilesloaded', () => {
              this.initMapSuccess = true;
              this.initMarkers();
          }
        );
      },
      setCenter(lat, lng) {
        this.map.setCenter(this.getLatLng(lat, lng));
      },
      setZoom(zoom) {
        this
        if (this.zoom) {
          this.map.setZoom(this.zoom);
        }
      },
      getLatLng(lat, lng) {
        return new qq.maps.LatLng(lat, lng)
      },
      initDatas() {
        getToiletLocations().then(res => {
          this.markerInfos = res;
          this.initDataSuccess = true;
          this.initMarkers();
        });
      },
      initMarkers() {
        if (this.initDataSuccess && this.initMapSuccess) {
          this.markerInfos.forEach(markerInfo => {
            this.initMarker(markerInfo);
          });
          // this.map.fitBounds(this.getBounds(this.markerInfos));
        }
      },
      initMarker(markerInfo) {
        var marker = new qq.maps.Marker({
          position: this.getLatLng(markerInfo.latitude, markerInfo.longitude),
          map: this.map
        });
        this.markers.push(marker);
      },
      getBounds(markerInfos) {
        let minLng = 180;
        let maxLng = 0;
        let minLat = 180;
        let maxLat = 0;
        for (let markerInfo of markerInfos) {
          if (markerInfo.longitude < minLng) {
            minLng = markerInfo.longitude;
          }
          if (markerInfo.longitude > maxLng) {
            maxLng = markerInfo.longitude;
          }
          if (markerInfo.latitude < minLat) {
            minLat = markerInfo.latitude;
          }
          if (markerInfo.latitude > maxLat) {
            maxLat = markerInfo.latitude;
          }
        }
        return new qq.maps.LatLngBounds(this.getLatLng(minLat, minLng), this.getLatLng(maxLat, maxLng));
      }
    },

    mounted() {
      // this.init();
      this.initMap();
      this.initDatas();
    }
  };

</script>

<style lang="less">
  .center-cmp {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 3px;
    display: flex;
    flex-direction: column;
    .cc-header

  {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }

  .cc-details {
    height: 120px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;
    .card

  {
    background-color: rgba(4,49,128,.6);
    color: #08e5ff;
    height: 70px;
    width: 70px;
    font-size: 45px;
    font-weight: bold;
    line-height: 70px;
    text-align: center;
    margin: 10px;
  }

  }

  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;
    .ccmc-middle

  {
    width: 50%;
    height: 90%;
    .active-ring-name

  {
    font-size: 20px !important;
  }

  }

  .ccmc-left, .ccmc-right {
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 24px;
    span

  {
    font-size: 40px;
    font-weight: bold;
  }

  .station-info {
    height: 80px;
    display: flex;
    align-items: center;
  }

  }

  .ccmc-left {
    align-items: flex-end;
    span

  {
    margin-left: 20px;
  }

  }

  .ccmc-right {
    align-items: flex-start;
    span

  {
    margin-right: 20px;
  }

  }
  }

  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  }
</style>
