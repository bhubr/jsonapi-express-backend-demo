module.exports = {
  users: {
    posts: {
      table: 'posts',
      type: 'hasMany',
      reverse: 'author'
    },
    comments: {
      table: 'comments',
      type: 'hasMany',
      reverse: 'author'
    },
    followers: {
      table: 'users',
      type: 'hasMany',
      reverse: 'followees'
    },
    followees: {
      table: 'users',
      type: 'hasMany',
      reverse: 'followers'
    }
  },
  posts: {
    author: {
      table: 'users',
      type: 'belongsTo',
      reverse: 'posts'
    },
    comments: {
      table: 'comments',
      type: 'hasMany',
      reverse: 'post'
    },
    tags: {
      table: 'tags',
      type: 'hasMany',
      reverse: 'posts'
    }
  },
  tags: {
    posts: {
      table: 'posts',
      type: 'hasMany',
      reverse: 'tags'
    }
  },
  comments: {
    post: {
      table: 'posts',
      type: 'belongsTo',
      reverse: 'comments'
    },
    author: {
      table: 'users',
      type: 'belongsTo',
      reverse: 'comments'
    }
  }
};