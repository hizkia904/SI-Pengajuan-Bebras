function Str(elem)
  -- Replace the specific string with OpenDocument inline content
  if elem.text == "$87324" then
    return pandoc.RawInline("opendocument", [[
        <text:span text:style-name="RESERVED_T17"><text:file-name text:display="name-and-extension">2024-XY-01-eng.odt</text:file-name></text:span><text:s/>This file.
    ]])
  end
end