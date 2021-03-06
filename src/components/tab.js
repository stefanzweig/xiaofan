'use strict'

const ff = require('../utils/fanfou')

const {CONSUMER_KEY} = require('../config/fanfou')

function render () {
  const page = getCurrentPages().slice(-1)[0]
  if (page) {
    page.setData({notis: getApp().globalData.notis})
  }
}

function updateNotis () {
  if (
    getApp() &&
    getApp().globalData &&
    getApp().globalData.account &&
    getApp().globalData.account.consumer_key === CONSUMER_KEY
  ) {
    render()
    ff.getPromise('/account/notification').then(res => {
      getApp().globalData.notis = res
      render()
    })
  }
}

function clearNotis (key) {
  getApp().globalData.notis[key] = 0
  render()
}

module.exports = {
  updateNotis,
  clearNotis
}
