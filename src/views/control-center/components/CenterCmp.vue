<template>
  <div class="center-cmp">
    <div id="map" style="width: 100%;height: calc(100% - 7px);margin: 0px"></div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        longitude: "",
        latitude: ""
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
      }
    },

    mounted() {
      this.init();
    }
  };

</script>

<style lang="less">
  .center-cmp {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 5px;
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
