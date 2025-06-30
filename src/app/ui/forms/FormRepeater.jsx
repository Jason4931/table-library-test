"use client";
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };




import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import "@ant-design/v5-patch-for-react-19";
const onFinish = (values) => {
  console.log("Received values of form:", values);
};


const FormRepeater = ({ formItem, formListName }) => (
  <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{ maxWidth: 600 }}
    autoComplete="off"
  >
    <Form.List name={formListName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((_a) => {
            var { key, name } = _a,
              restField = __rest(_a, ["key", "name"]);
            return (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                {formItem.map((item, index) => (
                  <Form.Item
                    {...restField}
                    name={[name, item.name]}
                    rules={[{ required: item.required, message: item.message }]}
                  >
                    <Input type={item.type || "text"} placeholder={item.placeholder} />
                  </Form.Item>
                ))}
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            );
          })}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add field
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default FormRepeater;
