const Utility = {
  methods: {
    parseDuration (duration) {
      // console.log('[Mixin App parseDuration duration]', duration);

      var sec_num = parseInt(duration, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours + ':' + minutes + ':' + seconds;
    },
    parseViews (views) {
      if (views >= 1100000)
      return (views / 1000000).toFixed(1) + 'M'
      if (views >= 1000000)
      return (views / 1000000).toFixed(0) + 'M'
      if (views >= 100000)
      return (views / 1000).toFixed(0) + 'K'
      if (views >= 10000)
      return (views / 1000).toFixed(0) + 'K'
      if (views >= 1100)
      return (views / 1000).toFixed(1) + 'K'
      if (views >= 1000)
      return (views / 1000).toFixed(0) + 'K'
      return views;
    },
    validateEmail (email) {
      let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regx.test(String(email).toLowerCase());
    },
    getDateTime () {
      var d = new Date();
      d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
      return d;
    },
    shuffleArray (array) {
      // console.log('[MCQ.vue -> shuffleArray -> array]', array);

      return array.sort((a,b) => {
        return Math.random() - 0.5;
      });
    },
    shuffleObject (obj) {
      var newObj = {};
      var keys = getKeys(obj);
      keys = shuffle(keys);

      for (var key in keys){
        newObj[keys[key]] = obj[keys[key]];
      }
      // Returns the shuffled object
      return newObj;

      function getKeys(obj) {
        var arr = new Array();
        for (var key in obj) {
          arr.push(key);
        }
        return arr;
      }
      function shuffle(arr) {
        for (var i = 0; i < arr.length; i++){
          var a = arr[i];
          var b = Math.floor(Math.random() * arr.length);
          arr[i] = arr[b];
          arr[b] = a;
        }
        return arr;
      }
    }
  }
}

export default Utility;
