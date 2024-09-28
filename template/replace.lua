function Image(el)
  -- Prepend "./" to the src attribute
  el.src = "./" .. el.src
  return el
end