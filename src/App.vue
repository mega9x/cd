<template>
  <div class="app">
    <div v-if="isGening">
      {{ent}}
    </div>
    <div v-if="!isGening">
      <a>生成数量: </a>
      <input v-bind:value="value"/>
      <button v-on:click="gen">生成</button>
    </div>
    <div class="cards" v-for="i in ents" :key="i">
      <CardCompomentVue :ent="i"/>
    </div>
  </div>

</template>

<script>
import CardCompomentVue from "./CardCompoment.vue";
const fs = require("fs");
// import fetchJsonp from "fetch-jsonp";
// const https = require('https-browserify');
const Fakerator = require("fakerator");
const Chance = require("chance");
// const getApi = "https://www.fakexy.com/fake-address-generator-ca";
const ccardPostApi = "https://dnschecker.org/ajax_files/credit_card_generator.php";
// const generator = require('creditcard-generator');

export default {
  components: {
    CardCompomentVue,
  },
  name: 'App',
  data() {
    return {
      isGening: false,
      ent: {},
      value: 10,
      ents: [],
      times: 0,
    }
  },
  methods: {
    sleep: async function(delay) {
      return new Promise(r => setTimeout(r, delay));
    },
    gen: async function() {
        this.isGening = true;
        this.ents = [];
        for(let i = 1; i <= this.value; i++) {
          let chance = new Chance();
          let entity;
          let fakerator = Fakerator("en-CA");
          fakerator.seed(Math.random());
          entity = fakerator.entity.user();
          while(!entity.address.country.includes("Canada")) {
            fakerator.seed(Date.now());
            entity = fakerator.entity.user();
            this.times++;
            await this.sleep(1);
            this.ent = entity;
          }
          let rndAddress = await this.getAddress();
          this.ent = entity;
          let genderGen = this.getGender();
          let name = chance.name( { nationality: "en", gender: genderGen } )
          let gender;
          if(genderGen === "male") {
            gender = "男";
          } else {
            gender = "女";
          }
          this.ents.push({
            fullname: name,
            nickname: entity.userName,
            sex: gender,
            brithday: this.getBirthday(),
            tempmail: chance.string({
              length: 8,
              pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
              Symbol: false
            }) + "@chacuo.com",
            phone: chance.phone({ formatted: false }),
            street: rndAddress.street,
            city: rndAddress.city,
            state: rndAddress.state,
            zip: rndAddress.zip,
            ssn: chance.ssn({ dashes: false }),
          });
          await this.sleep(500);
      }
      this.isGening = false;
    },
    objToUrlEncoded: function(obj) {
      let body = [];
      for(let prop in obj) {
        let encodedKey = encodeURIComponent(prop);
        let encodedVal = encodeURIComponent(obj[prop]);
        body.push(encodedKey + "=" + encodedVal);
      }
      body = body.join("&");
      return body;
    },
    fetchPost: async function(uri, datas) {
      let response = await fetch(
        uri, {
            referrerPolicy: 'no-referrer',
            method: 'POST',
            body: datas,
            headers: {
              Accept: "*/*",
              "content-type": "application/json; charset=UTF-8",
              origin: "https://www.meiguodizhi.com",
              Referer: "https://www.meiguodizhi.com/ca-address/hot-city-Toronto?hl=en",
              "accept-language": "en,zh-CN;q=0.9,zh;q=0.8,en-GB;q=0.7,en-US;q=0.6",
              "sec-fetch-site": "no-referrer-when-downgrade"
            },
            mode: "cors",
        }
      )
      return response;
    },
    fetchGet: async function(uri) {
      let response = await fetch(
          uri, {
            method: 'GET',
            mode: "no-cors"
          }
      );
      return response;
    },
    getAddress: async function() {
      let address = JSON.parse(fs.readFileSync("./resources/data/address.json"));
      let num = this.getRandom(0, address.length);
      let responseJson = address[num];
      console.log(responseJson)
      return {
        street: responseJson.Address,
        city: responseJson.City,
        state: responseJson.State,
        zip: responseJson.Zip_Code,
      };
    },
    getCreditCard: async function() {
      let ccData = {
        network: "mastercard",
        quantity: "1",
      };
      let data = this.objToUrlEncoded(ccData);
      let response = await this.fetchPost(ccardPostApi, data);
      let obj = await response.json();
      return obj.results;
    },
    getBirthday: function() {
      let chance = new Chance();
      let yr = this.getRandom(1987, 2001);
      let mth = this.getRandom(1, 13);
      let date = chance.date({ month: mth, string: true, american: false });
      let day = date.split("/")[0];
      console.log(mth + "-" + day + "-" + yr);
      return mth + "-" + day + "-" + yr;
    },
    getRandom: function (min,max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    getGender: function() {
      let rnd = this.getRandom(0,2);
      if(rnd == 1) {
        return "female";
      } else {
        return "male";
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 40px;
  margin-left: 20px;
}
</style>
