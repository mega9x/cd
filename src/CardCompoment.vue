<template>
    <div class="card-container">
        <p>
            姓名: {{ ent.fullname }}
        </p>
        <p>
            昵称: {{ ent.nickname }}
        </p>
        <p>
            性别: {{ ent.sex }}  
        </p>
        <p>
            生日: {{ ent.brithday }}
        </p>
        <p>
            电话: {{ ent.phone }}
        </p>
        <p>
            SSN: {{ ent.ssn }}
        </p>
        <p>
            街道和门牌号: {{ ent.street }}
        </p>
        <p>
            城市: {{ ent.city }}
        </p>
        <p>
            省/州/地方: {{ ent.state }}
        </p>
        <p>
            邮编: {{ ent.zip }}
        </p>
        <p>
            查错网临时邮箱: {{ ent.tempmail }}
        </p>
    </div>
</template>
  
<script>
/* eslint-disable */
  export default {
    name: 'Card',
    props: ['ent'],
    data() {
      return {
      }
    },
}
</script>

<style>
    .card-container {
        margin: 15px;
        padding: 5px;
        background: rgb(238, 238, 238);
        border-radius: 5px;
    }
    .card-container > p {
        margin-left: 10px;
        line-height: 15px;
    }
</style>
  