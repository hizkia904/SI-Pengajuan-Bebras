-- Define the Lua filter function
function Pandoc(doc)
    local new_blocks = {}
    local header_found = false

    -- Iterate over the blocks of the document
    for i, block in ipairs(doc.blocks) do
        -- Add the current block to the new_blocks list
        table.insert(new_blocks, block)
        
        -- Check if the current block is a header
        if block.t == "Header" and block.level == 2 then
            local header_text = ""

            -- Concatenate the text of the header, including spaces
            for _, elem in ipairs(block.content) do
                if elem.t == "Str" then
                    header_text = header_text .. elem.text
                elseif elem.t == "Space" then
                    header_text = header_text .. " "
                end
            end

            -- Check if the header matches the target text (with spaces)
            if header_text == "Graphics and Other Files" then
                -- Insert the new content immediately after the header
                table.insert(new_blocks, pandoc.RawBlock("opendocument", [[
                    <text:p text:style-name="Text_20_Body_20_Not_20_To_20_Be_20_Mofidied"><text:span text:style-name="T13"><text:file-name text:display="name-and-extension">Rehearsal Schedule (25).odt</text:file-name></text:span><text:s/>This file.</text:p>
                ]]))
            end
        end
    end

    -- Return the new document structure
    return pandoc.Pandoc(new_blocks, doc.meta)
end
