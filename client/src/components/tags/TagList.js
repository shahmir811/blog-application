import React, { useEffect } from 'react';
import TagItem from './TagItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';

import { all_tags } from '../../actions/tagActions';

const TagList = ({ all_tags, tagsList }) => {
  const selectedTagChanged = e => {
    // setSelectedTag(e);
  };

  useEffect(() => {
    all_tags();
    // eslint-disable-next-line
  }, [all_tags]);

  const { tags, selectedTag } = tagsList;

  const renderTags = () => {
    if (tags !== null && tags.length > 0) {
      return tags.map(tag => (
        <TagItem
          key={tag._id}
          tag={tag}
          selectedTag={selectedTag}
          onChange={selectedTagChanged}
        />
      ));
    } else {
      return <Spinner />;
    }
  };

  return <div>{renderTags()}</div>;
};

///////////////////////////// propTypes //////////////////////////////////
TagList.propTypes = {
  tagsList: PropTypes.object.isRequired
};

///////////////////////////// mapStateToProps //////////////////////////////////
const mapStateToProps = state => ({
  tagsList: state.tag
});

///////////////////////////// mapDispatchToProps //////////////////////////////////
const mapDispatchToProps = dispatch => ({
  all_tags: () => dispatch(all_tags())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagList);
