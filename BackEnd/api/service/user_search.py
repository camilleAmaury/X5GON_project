def build_user_search_schema(user_search):
    mod = {}
    mod['search_subject'] = user_search.search_subject
    mod['search_id'] = user_search.search_id
    return mod
