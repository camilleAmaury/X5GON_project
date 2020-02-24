def build_like_schema(like):
    mod = {}
    mod['like_id'] = like.like_id
    mod['user_id'] = like.user_id
    mod['comment_id'] = like.comment_id
    mod['like_value'] = like.like_value
    return mod
