import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify ({
    rtl: false,
    theme: {
      options: {
        customProperties: true,
      },
      dark: true,
      themes: {
        dark: {
          primary: '#1976D2',
          accent: '#E91E63',
          secondary: '#1DA1F2',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252',
          background: '#F5F5F5',
        },
        light: {
          primary: '#1976D2',
          accent: '#E91E63',
          secondary: '#1DA1F2',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252'
        }
      }
    }
  });
