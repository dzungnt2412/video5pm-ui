<template>
  <p-modal :active="visible" title="Upload Video" @close="handleClose">
    <template>
      <div align="center">
        <div class="flex w-full h-screen items-center justify-content-center text-center" id="app">
          
          <div class="d-flex flex-column  p-12 bg-gray-100 border border-gray-300 items-center justify-content-center" @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <p-icon
              name="cloud-upload"
              icon-pack="md"
              class="el-icon-upload"
            ></p-icon>
            <input type="file" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
              class="input" @change="onChange" ref="file" accept=".mp4" />
          
            <label for="assetsFieldHandle" class="block cursor-pointer">
              <div>
                Drop file here or
                or <span class="click" style="text-decoration: underline;">click here</span> to upload your files
              </div>
            </label>
            <ul class="mt-4" v-if="this.filelist.length" v-cloak>
              <li class="text-sm p-1" v-for="(file, i) in filelist" :key=i>
                {{ file.name }}
              <button class="ml-2" type="button" @click="remove(filelist.indexOf(file))" title="Remove file">remove</button>
              </li>
            </ul>
          </div>

            <a
                v-if="filelist.length!=0"
                class="btn btn-secondary"
                @click.prevent="upload()"
                >Upload</a>
          
        </div>
      </div>
    </template>

    <template slot="footer"> </template>
  </p-modal>
</template>

<style>
  [v-cloak] {
    display: none;
  }

  .input {
    opacity: 0;
    overflow: hidden;
    display: absolute;
  }

  .click{
    color: blue;
  }
</style>

<script>
import mixinRoute from '@core/mixins/route'
import mixinTable from '@core/mixins/table'

export default {
  name: 'ModalUploadVideo',
  mixins: [mixinRoute],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },

  computed: {},
  data() {
    return {
      filelist: [],
      length: 0,
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false)
    },
    onChange() {
      this.filelist = [...this.$refs.file.files];
    },
    remove(i) {
      this.filelist.splice(i, 1);
    },
    dragover(event) {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100');
        event.currentTarget.classList.add('bg-green-300');
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    drop(event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange(); // Trigger the onChange event manually
      // Clean up
      event.currentTarget.classList.add('bg-gray-100');
      event.currentTarget.classList.remove('bg-green-300');
    },
    upload(){
      let fileURL = URL.createObjectURL(this.filelist[0]);
      let vid = document.createElement('video');
      vid.src = fileURL;
      // wait for duration to change from NaN to the actual duration
      const self = this
      vid.ondurationchange = function() {
        if (Math.ceil(this.duration) != 0){
          self.length = Math.ceil(this.duration) 
        }
       
      };
      console.log(this.length + " " +(this.filelist).length)
      if (this.length > 0 &&  (this.filelist).length > 0){
        this.$emit('upload', this.length, this.filelist[0])
      } 
      
    }
  },
}
</script>
