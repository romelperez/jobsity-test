import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import minBy from 'lodash/minBy';
import Row from 'react-materialize/lib/Row';
import Col from 'react-materialize/lib/Col';
import Tabs from 'react-materialize/lib/Tabs';
import Tab from 'react-materialize/lib/Tab';
import Button from 'react-materialize/lib/Button';

import * as actionsCats from 'client/actions/cats';
import * as actionsFields from 'client/actions/fields';
import Wrapper, { WrapperContent } from 'client/components/Wrapper';
import Header from 'client/components/Header';
import Footer from 'client/components/Footer';
import Loading from 'client/components/Loading';
import Field from 'client/components/Field';

const mapStateToProps = function (state) {
  return {
    cats: state.cats,
    fields: state.fields,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    handleFetchCats: (...args) => dispatch(actionsCats.fetch(...args)),
    handleAdd: (...args) => dispatch(actionsFields.add(...args)),
    handleSave: (...args) => dispatch(actionsFields.save(...args)),
  };
};

class BuilderApp extends Component {

  constructor () {
    super(...arguments);
  }

  componentDidMount () {
    this.props.handleFetchCats();
    this.onStart();
  }

  componentDidUpdate (prevProps) {

    this.onStart();

    // The category id has changed.
    if (prevProps.params.catId !== this.props.params.catId) {
      //
    }
  }

  render () {

    const { catId } = this.props.params;
    const { isFetching, list: cats } = this.props.cats;
    const catsList = cats.sort((a, b) => a.position - b.position);
    const cat = cats.find(el => el._id === catId);

    return (
      <Wrapper className='dashboard-app'>
        <Header />
        <WrapperContent className='dashboard-app__main'>

          <Row>
            <Col s={12}>
              { isFetching && <Loading /> }
            </Col>
          </Row>

          { !isFetching && !!cat && (
            <div ref={el => (this.content = el)}>

              <Tabs className='z-depth-1' onChange={this.onTab}>
                { catsList.map(el => (
                  <Tab key={el._id} title={el.name} active={el._id === catId}>
                    <div className='dashboard-app__field'>
                      { !this.getFieldsByCat(el._id).length && (
                        <p>There are no attributes in this category.</p>
                      ) }
                      { this.getFieldsByCat(el._id).map(field => (
                        <Field key={field._id} {...field} onChange={this.onChange} />
                      )) }
                      <Row>
                        <Col s={12}>
                          <Button
                            waves='light'
                            onClick={() => this.onAdd(el._id)}
                          >
                            <i className='mdi mdi-plus' /> Add Attribute
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Tab>
                )) }
              </Tabs>

              <Row className='dashboard-app__opts'>
                <Col s={12} className='right-align'>
                  <Button flat waves='light' onClick={this.onCancel}>
                    <i className='mdi mdi-logout' /> Cancel
                  </Button>
                  {' '}
                  <Button waves='light' onClick={this.onSave}>
                    <i className='mdi mdi-content-save' /> Save
                  </Button>
                </Col>
              </Row>

            </div>
          ) }

        </WrapperContent>
        <Footer />
      </Wrapper>
    );
  }

  /**
   * When this container starts, review if a category was provided, if not set
   * one with the first position.
   */
  onStart () {

    const { catId } = this.props.params;
    const { isFetching, list: cats } = this.props.cats;

    if (!catId && !isFetching && cats.length) {
      const min = minBy(cats, el => el.position);
      this.props.router.push('/builder/' + min._id);
    }
  }

  onTab = (index) => {
    const { list: cats } = this.props.cats;
    const catsList = cats.sort((a, b) => a.position - b.position);
    const cat = catsList[index];
    this.props.router.push('/builder/' + cat._id);
  }

  onAdd = (catId) => {

    const cats = this.getFieldsByCat(catId);
    const fieldEmpty = cats.find(el => !el.params.name);

    // If there is at least one field without name, focus it, otherwise add a new one.
    if (fieldEmpty) {
      $(this.content).find(`.field[data-id="${fieldEmpty._id}"] input[name="name"]`).trigger('focus');
    }
    else {
      this.props.handleAdd({ cat: catId });
    }
  }

  onChange = (field) => {
    this.props.handleSave(field);
  }

  onCancel = (ev) => {
    ev.preventDefault();
    this.props.router.push('/');
  }

  onSave = (ev) => {
    ev.preventDefault();

    // TODO:
    // DEBUG:
    console.log('onSave');
  }

  getFieldsByCat (cat) {
    const { list: fields } = this.props.fields;
    return fields.filter(el => el.params.cat === cat);
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BuilderApp)
);
