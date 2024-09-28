function RawBlock(el)
  -- Replace &nbsp; with a space in raw HTML blocks
  el.text = el.text:gsub("&nbsp;", " ")
  return el
end

function RawInline(el)
  -- Replace &nbsp; with a space in raw HTML inline elements
  el.text = el.text:gsub("&nbsp;", " ")
  return el
end
