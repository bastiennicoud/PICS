<!-- PicsMetas.vue -->
<!-- Displays the aside on the home wiew (contains the three wiewß) -->

<template>
  <div id="picsMetas">

    <h4>Nom :</h4>
    <el-input
      placeholder="Nom de la photo"
      v-model="pics.name"
      clearable/>

    <h4>Date :</h4>
    <el-date-picker
      v-model="pics.date"
      type="datetime"
      placeholder="Date et heure"
      format="dd.MM.yyyy à HH:mm"
      value-format="yyyy-MM-dd_HH-mm-ss"/>

    <h4>Lieux :</h4>
    <el-input
      placeholder="Lieux"
      v-model="pics.places"
      clearable/>

    <h4>Description :</h4>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="Description"
      v-model="pics.description"/>

    <h4>Favoris :</h4>
    <el-button
      type="info"
      @click="starr()"
      :icon="starIcon"
      plain/>

    <!-- This zone is used to add persons to the photo, is the same component as tags -->
    <div class="tagsZone">
      <h4>Personnes :</h4>
      <el-tag
        :key="people"
        v-for="people in pics.peoples"
        closable
        :disable-transitions="false"
        @close="handleClosePeople(people)">{{ people }}</el-tag>

      <el-input
        class="input-new-tag"
        v-if="inputPeopleVisible"
        v-model="inputPeopleValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirmPeople"
        @blur="handleInputConfirmPeople"/>

      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showInputPeople">+ Ajouter une personne</el-button>
    </div>

    <!-- This zone is the tags -->
    <div class="tagsZone">
      <h4>Tags :</h4>
      <el-tag
        :key="tag"
        v-for="tag in pics.tags"
        closable
        :disable-transitions="false"
        @close="handleCloseTag(tag)">{{ tag }}</el-tag>

      <el-input
        class="input-new-tag"
        v-if="inputTagVisible"
        v-model="inputTagValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirmTag"
        @blur="handleInputConfirmTag"/>

      <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showInputTag">+ Nouveau Tag</el-button>
    </div>

    <!-- The button to persists the new pics datas -->
    <el-button
      type="primary"
      @click="savePics()">Enregistrer les informations</el-button>

  </div>
</template>



<!-- All the methods and the propertys used by this component -->
<script>

export default {
  // component name
  name: "picsMetas",

  // component datas
  data () {
    return {
      // used by the tags
      inputTagVisible: false,
      inputTagValue:'',
      inputPeopleVisible: false,
      inputPeopleValue:''
    }
  },

  // componenet props (the pics, passed by the parent)
  props: {
    pics: {}
  },

  // computed propertys are automaticaly calculated on change
  computed: {

    // This function return the right icon name if the pics is starred
    starIcon () {
      if (this.pics.starred == 0) {
        return 'el-icon-star-off'
      } else {
        return 'el-icon-star-on'
      }
    }
  },

  // all the methods for this component
  methods: {
    // METHODS FOR THE TAGS
    // delete the tag if we click on the close icon
    handleCloseTag (tag) {
      this.pics.tags.splice(this.pics.tags.indexOf(tag), 1);
    },

    // display the input if we click on the new tag button
    showInputTag () {
      this.inputTagVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // create the tag wen we press the enter key
    handleInputConfirmTag () {
      let inputTagValue = this.inputTagValue;
      if (inputTagValue) {
        this.pics.tags.push(inputTagValue);
      }
      this.inputTagVisible = false;
      this.inputTagValue = '';
    },


    // METHODS FOR THE PEOPLES
    // delete the tag if we click on the close icon
    handleClosePeople (people) {
      this.pics.peoples.splice(this.pics.peoples.indexOf(people), 1);
    },

    // display the input if we click on the new tag button
    showInputPeople () {
      this.inputPeopleVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    // create the tag wen we press the enter key
    handleInputConfirmPeople () {
      let inputPeopleValue = this.inputPeopleValue;
      if (inputPeopleValue) {
        this.pics.peoples.push(inputPeopleValue);
      }
      this.inputPeopleVisible = false;
      this.inputPeopleValue = '';
    },



    // modify the starred value of the pics wen we click on the star button
    starr () {
      if (this.pics.starred == 1) {
        this.pics.starred = 0
      } else {
        this.pics.starred = 1
      }
    },

    // make a request to the main process to save the submited pics datas
    savePics () {
      this.$electron.ipcRenderer.send('editPicsDatas', this.pics)
    },

    // toggle a success notification message
    successMessage(msg) {
      this.$message(msg);
    }
  },

  // executed when the componenet is mounted in the wiev
  mounted () {

    // watch succes message from the main process when the pics datas are updated
    this.$electron.ipcRenderer.on('picsDetailsUpdated', (event, data) => {
      this.successMessage(data)
    })
  }
}

</script>



<style lang="scss" scoped>

#picsMetas {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  background-color: $light;
  overflow: scroll;
}

h4 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.el-tag{
  margin-right: 10px;
  margin-top:10px;
}

.button-new-tag {
  height: 32px;
  margin-top:10px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-top:10px;
}

.tagsZone {
  margin-top: 15px;
  margin-left: 0;
  margin-bottom: 15px;
}

</style>
