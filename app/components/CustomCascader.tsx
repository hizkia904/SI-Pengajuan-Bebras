import { Cascader, Form } from "antd";
import { DefaultOptionType } from "antd/es/cascader";
import { useState } from "react";
const { Item, List } = Form;

export default function CustomCascader({
  data,
  label,
  name,
  message,
}: {
  data: any;
  label: string;
  name: string;
  message: string;
}) {
  const [cascaderValue, setCascaderValue] = useState<
    (string | number | null)[][] | undefined
  >(undefined);

  return (
    <Item label={label} name={name} rules={[{ required: true, message }]}>
      <Cascader
        value={cascaderValue}
        displayRender={(
          label: string[],
          selectedOptions?: DefaultOptionType[] | undefined
        ) => label[0] + " (" + label[1] + ")"}
        multiple
        options={data}
        onChange={(
          value: (string | number | null)[][],
          selectOptions: DefaultOptionType[]
        ) => {
          if (value.length > 1) {
            const lastInserted = value[value.length - 1];
            const umur_last_inserted = lastInserted[0];

            let indexDuplicate = null;
            for (let i = 0; i < value.length - 1; i++) {
              if (value[i][0] == umur_last_inserted) {
                console.log("DUPLICATE");
                indexDuplicate = i;
              }
            }
            if (indexDuplicate != null) {
              value.pop();
            }
          }
          setCascaderValue(value);
        }}
        placeholder="Please select"
      />
    </Item>
  );
}
