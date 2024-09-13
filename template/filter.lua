function Str(elem)
  -- Replace the specific string with OpenDocument block content
  if elem.text == "$87324" then
    return pandoc.RawBlock("opendocument", [[
      <text:p text:style-name="Text_20_Body_20_Not_20_To_20_Be_20_Mofidied">
        <text:span text:style-name="T13">
          <text:file-name text:display="name-and-extension">Rehearsal Schedule (25).odt</text:file-name>
        </text:span>
        <text:s/>This file.
      </text:p>
    ]])
  end
end