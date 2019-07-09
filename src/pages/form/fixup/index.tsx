import {
  Button,
  Card,
  DatePicker,
  Form,
  Icon,
  Input,
  InputNumber,
  Radio,
  Select,
  Tooltip
} from "antd";
import { FormattedMessage, formatMessage } from "umi-plugin-react/locale";
import React, { Component } from "react";

import { Dispatch } from "redux";
import { FormComponentProps } from "antd/es/form";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { connect } from "dva";
import styles from "./style.less";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface FixupProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

class Fixup extends Component<FixupProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: "formFixup/submitRegularForm",
          payload: values
        });
      }
    });
  };

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue }
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 }
      }
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 }
      }
    };

    return (
      <PageHeaderWrapper
        content={<FormattedMessage id="form-fixup.basic.description" />}
      >
        <Card bordered={false}>
          <Form
            onSubmit={this.handleSubmit}
            hideRequiredMark
            style={{ marginTop: 8 }}
          >
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-fixup.type.label" />}
            >
              {getFieldDecorator("type", {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: "form-fixup.type.required" })
                  }
                ]
              })(
                <Select defaultValue="ea">
                  <Option value="ea">电器</Option>
                  <Option value="c">电脑</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-fixup.owner.label" />}
            >
              {getFieldDecorator("owner", {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: "form-fixup.owner.required" })
                  }
                ]
              })(
                <Input
                  placeholder={formatMessage({
                    id: "form-fixup.owner.placeholder"
                  })}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-fixup.phone.label" />}
            >
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: "form-fixup.phone.required" })
                  }
                ]
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="form-fixup.issue.label" />}
            >
              {getFieldDecorator("issue", {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: "form-fixup.issue.required" })
                  }
                ]
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({
                    id: "form-fixup.issue.placeholder"
                  })}
                  rows={4}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="form-fixup.remark.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="form-fixup.form.optional" />
                    <Tooltip
                      title={
                        <FormattedMessage id="form-fixup.remark.tooltip" />
                      }
                    >
                      <Icon type="info-circle-o" style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator("remark")(
                <Input
                  placeholder={formatMessage({
                    id: "form-fixup.remark.placeholder"
                  })}
                />
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="form-fixup.form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="form-fixup.form.save" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create<FixupProps>()(
  connect(
    ({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
      submitting: loading.effects["formFixup/submitRegularForm"]
    })
  )(Fixup)
);
