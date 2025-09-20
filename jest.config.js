export default {
  transform: {
    '^.+\\.vue$': ['@vue/vue3-jest', { compiler: '@vue/compiler-sfc' }],
    '^.+\\.js$': 'babel-jest'
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jsdom'
};
