/* @flow */

'use strict';

var React = require('react/addons');
var _ = require('lodash');

module.exports = function (treeData) {

  var cognitoAuth = require('../../lib/cognito')();
  var userHandler = require('../../lib/user')(treeData);

  var Field = require('../elements/ProfileField.jsx')(treeData);

  return React.createClass({
    displayName: 'Profile',

    mixins: [treeData.mixin, React.addons.LinkedStateMixin],

    cursors: {
      user: ['user'],
      profile: ['profile'],
    },

    contextTypes: {
      router: React.PropTypes.func.isRequired
    },


    getInitialState: function getInitialState() : Object {
      return {
        isEditable: false
      };
    },


    componentWillMount: function() : void {
      if (!this.cursors.user.get().authed) {
        this.context.router.transitionTo('home');
      }
    },


    componentDidMount: function() : void {

      var componentScope = this;

      if (!_.isEmpty(componentScope.cursors.profile.get())) {
        componentScope.loadProfile();
      } else {
        this.cursors.profile.on('update', function () { componentScope.loadProfile(); });
      }
    },


    loadProfile: function loadProfile() {

      var profile = this.cursors.profile.get();

      var editable = profile.nome !== '' && profile.cognome !== '';
      this.editMode(!editable);
    },


    saveProfile: function saveProfile(e) {

      console.log('saving profile...');
      var data = {};
      _.each(this.refs, function (ref, key) {
        data[key] = ref.state.value;
      });

      userHandler.updateProfile(data);

      this.editMode(false);

      e.preventDefault();
      e.stopPropagation();
    },


    editMode: function editMode(isEditable) {
      this.setState({ isEditable: isEditable });
    },


    onEditProfile: function onEditProfile() {
      this.editMode(true);
    },


    render: function() : React.PropTypes.element {

      var saveProfileButton, editProfileButton;

      if (this.state.isEditable) {
        saveProfileButton = (
          <div className="text-center">
            <button type="submit" className="pure-button pure-success">
              <span>Save profile</span>
            </button>
          </div>
        );
        editProfileButton = <div></div>;
      } else  {
        editProfileButton = (
          <button type='button' id="edit-profile" style={{"padding": "2px 5px;"}} className="pure-button pure-success">
            <i className="fa fa-plus"></i>
            <span  onClick={this.onEditProfile}>Edit profile</span>
          </button>
        );
        saveProfileButton = <div></div>;
      }


      return (
        <div className="page">
          <div className="container">
            <div className="spacer-40"></div>
            <div className="spacer-80"></div>
            <div className="text-center">
              <h1>Your profile</h1>
            </div>
            <div className="spacer-10"></div>
            <hr/>
            <div className="pure-g">
              <div className="pure-u-1 pure-u-md-1-2">
                <div className="profile-padding">
                  <form id="profile-form" className="pure-form" onSubmit={this.saveProfile}>
                    <div className="pure-u-3-4">
                      <h3>Your details</h3>
                    </div>
                    <div className="pure-u-1-4">
                      { editProfileButton }
                    </div>
                    <div className="pure-control-group">
                      <Field key={"nome"} type={"text"} isEditable={this.state.isEditable} initialValue={this.cursors.profile.get().nome} placeholder={"Nome"} ref='nome' />
                    </div>

                    <div className="spacer-10"></div>

                    <div className="pure-control-group">
                      <Field key={"cognome"} type={"text"} isEditable={this.state.isEditable} initialValue={this.cursors.profile.get().cognome} placeholder={"Cognome"} ref='cognome' />
                    </div>

                    <div className="spacer-10"></div>

                    <div className="pure-control-group">
                      <Field key={"email"} type={"email"} isEditable={this.state.isEditable} initialValue={this.cursors.profile.get().email} placeholder={"E-Mail"} ref='email' />
                    </div>

                    <div className="spacer-10"></div>

                    <div className="pure-control-group">
                      <Field key={"telefono"} type={"tel"} isEditable={this.state.isEditable} initialValue={this.cursors.profile.get().telefono} placeholder={"Recapito telefonico"} ref='telefono' />
                    </div>
                    <div className="spacer-40"></div>

                    {saveProfileButton}

                  </form>
                </div>
              </div>
              <div className="pure-u-1 pure-u-md-1-2">
                <div className="profile-padding">
                  <div className="pure-g">
                    <div className="pure-u-3-4">
                      <h3>Your delivery addresses</h3>
                    </div>
                    <div className="pure-u-1-4">
                      <button id="new-address" style={{"padding": "2px 5px;"}} className="pure-button pure-success"><i className="fa fa-plus"></i><span>Add new</span></button>
                    </div>
                  </div>
                  <ol>
                    <li className="single-address">
                      <blockquote>
                        <p>piazza L. V. Bertarelli 1<br/>20123, Milano</p>
                      </blockquote>
                    </li>
                  </ol>
                  <div className="spacer-40"></div>
                  <div id="delivery-form" style={{"display": "none"}} className="pure-form">
                    <div className="pure-control-group"><label>Etichetta</label><input type="text" name="etichetta" placeholder="Etichetta"/></div>
                    <div className="pure-g">
                      <div className="pure-u-19-24">
                        <div className="pure-control-group"><label>Via / P.zza</label><input type="text" name="via" placeholder="Via / P.zza"/></div>
                      </div>
                      <div className="pure-u-1-24"></div>
                      <div className="pure-u-4-24">
                        <div className="pure-control-group"><label>Numero</label><input type="text" name="numeroCivico" placeholder="Nr."/></div>
                      </div>
                    </div>
                    <div className="spacer-10"></div>
                    <div className="pure-g">
                      <div className="pure-u-5-24"><label>CAP</label><input type="text" name="cap" placeholder="CAP"/></div>
                      <div className="pure-u-1-24"></div>
                      <div className="pure-u-18-24"><label>Città</label><input type="text" name="citta" placeholder="Città"/></div>
                    </div>
                    <div className="spacer-40"></div>
                    <div className="text-center"><button type="submit" className="pure-button pure-success"><span>Salva indirizzo di spedizione</span></button></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="spacer-60"></div>
          </div>
        </div>);
    }

  });

};
