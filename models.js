module.exports = {
  user: {
    relationships: {
      posts: {
        model: 'post',
        type: 'hasMany',
        reverse: 'author'
      },
      comments: {
        model: 'comment',
        type: 'hasMany',
        reverse: 'author'
      },
      followers: {
        model: 'user',
        type: 'hasMany',
        reverse: 'followees'
      },
      followees: {
        model: 'user',
        type: 'hasMany',
        reverse: 'followers'
      }
    }
  },
  post: {
    relationships: {
      author: {
        model: 'user',
        type: 'belongsTo',
        reverse: 'posts'
      },
      comments: {
        model: 'comment',
        type: 'hasMany',
        reverse: 'post'
      },
      tags: {
        model: 'tag',
        type: 'hasMany',
        reverse: 'posts'
      }
    }
  },
  tag: {
    relationships: {
      posts: {
        model: 'post',
        type: 'hasMany',
        reverse: 'tags'
      }
    }
  },
  comment: {
    relationships: {
      post: {
        model: 'post',
        type: 'belongsTo',
        reverse: 'comments'
      },
      author: {
        model: 'user',
        type: 'belongsTo',
        reverse: 'comments'
      }
    }
  }
};
