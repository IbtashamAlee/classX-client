import PropTypes from "prop-types";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Toast from "./toast";
import { removeToast } from "../redux/actions/toast-actions";

const Toasts = ({ actions, toasts }) => {
  const { removeToast } = actions;
  return (
      <ul className="toasts">
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start notification"
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
            {toasts.map(toast => {
              //const { id } = toast;
              return (
                  <Toast {...toast} key={toast.id} onDismissClick={(id) => removeToast(id)} />
              );
            })}
          </div>
        </div>
      </ul>
  );
};

Toasts.propTypes = {
  actions: PropTypes.shape({
    removeToast: PropTypes.func.isRequired
  }).isRequired,
  toasts: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ removeToast }, dispatch)
  };
}

const mapStateToProps = state => ({
  toasts: state.toasts
});

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
