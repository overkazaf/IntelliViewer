import ComponentFactory from '../factory/ComponentFactory';
import LayoutEngine from '../engine/LayoutEngine';

import {
	Row,
	Col,
	Layout,
} from 'antd';

let {
	Header,
	Footer,
	Content,
} = Layout;

import ArrayUtil from '../utils/ArrayUtil';

export default
class RenderEngine {

	static renderPageView(pageJson) {
		let {
	      id, // 设计器系统生成的id
		  key, // 可自定义的id
		  name,　// 名字
		  title,
		  description,
		  formType,
		  pageIndex,
		  theme,
		  creater, // 创建者名字
		  createTS,
		  style,
		  nextId, // 下推表单
		  plugIns,
		  basicProps,
		  dataSource,
		  eventList,
		  advanced,
		  layouts,
	    } = pageJson;

	    let formProps = { 
	    	eventList, 
	    	layouts: {
	    		header, body, footer,
	    	}, 
		};

	    let contentStyle = { background: '#fff', padding: 24, minHeight: `${contentMinHeight}` };

	    const userMap = {
	      'u-001': 'Admin',
	    };

	    let headerComponents = header.components.map((item, index) => {
        	let {
        		type,
        		props,
        	} = item;
        	
        	return (
        		<div key={`header-comp-${index}`}>
                    {RenderEngine.renderComponent(type, props)}
                </div>
        	)
        });

		let bodyComponents = body.components.map((item, index) => {
        	let {
        		type,
        		props,
        	} = item;
        	
        	return (
        		<div key={`body-comp-${index}`}>
                    {RenderEngine.renderComponent(type, props)}
                </div>
        	)
        });

        let headerComponentGroup = ArrayUtil.makeGroup(headerComponents, 4);
        let bodyComponentGroup = ArrayUtil.makeGroup(bodyComponents, 1);
        
        let headerContent = LayoutEngine.renderLayout(
        						headerComponentGroup
        					);
        let bodyContent = LayoutEngine.renderLayout(
        						bodyComponentGroup,
        						24
        					);

		return (
			<div id="form-view" 
		        style={style} 
		      >
		      <Layout>
		        <Header>
		        	<h1 style={{textAlign: 'center', color: '#fff'}}>{label}</h1>
		        </Header>
		        <Content>
		        	<div>
		        		<b>form id: {id}, creater: {userMap[creater]}, created at: {createTS}</b>
		        	</div>
					<div style={contentStyle}>
						{headerContent}
						{bodyContent}
					</div>
		        </Content>
		        <Footer>
		        	<Row type="flex" justify="end">
				      <Col span={4}>
				      	{
							footer.components.map((item, index) => {
							  let {
							    type,
							    props,
							  } = item;

							  return (
							    <span key={`footer-comp-${index}`}>
							      {RenderEngine.renderComponent(type, props)}
							    </span>
							  )
							})
						}
				      </Col>
				    </Row>
		        </Footer>
		        </Layout>
		      </div>
		)
	}

	static renderComponent(type, props, mode = 'read') {
		let componentContent = ComponentFactory.create(type, props);
		let {
			label,
			value,
			defaultValue,
			ctrlType,
		} = props;

		if (mode === 'read' && ctrlType !== 'IFButton' && ctrlType !== 'IFInput') {
			return (
				<div style={props.style}>
					<span>{label}:</span><span>{value}</span>
				</div>
			)
		}

		return (
			<div style={props.style}>
				{componentContent}
			</div>
		);
	}
}