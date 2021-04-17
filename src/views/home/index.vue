<template>
    <div class="home-container">
        <div id="home-map" class="home-map"></div>
    </div>
</template>

<script>
    export default {
        name: "Home",
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
              var map = new qq.maps.Map(document.getElementById('home-map'), {
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
    }
</script>

<style lang="less" scoped>
    .home-container {
        width: 100%;
        height: 100%;

        .home-map {
            width: 100%;
            height: 100%;
        }
    }
</style>