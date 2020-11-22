const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: true,
    blogList: [{
      id: 0,
      title: 'aaaaa'
    }, {
      id: 1,
      title: 'bbbbb'
    }, {
      id: 2,
      title: 'ccccc'
    }]
  })
})

router.get('/json', async (ctx, next) => {
  let session = ctx.session
  if (session.viewNum === null) {
    session.viewNum = 0
  }
  session.viewNum += 1
  ctx.body = {
    title: 'koa2 json',
    viewNum: session.viewNum
  }
})

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params
  ctx.body = {
    title: 'this is profile page',
    userName
  }
})


module.exports = router
