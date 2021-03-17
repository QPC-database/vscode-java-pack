// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

export const classpathConfigurationViewSlice = createSlice({
    name: "classpathConfig",
    initialState: {
      activeProjectIndex: 0,
      projects: [],
      projectType: undefined,
      sources: [] as string[],
      output: "",
      referencedLibraries: [] as string[],
      exception: undefined,
    },
    reducers: {
      listProjects: (state, action) => {
        state.projects = action.payload;
        state.activeProjectIndex = 0;
      },
      activeProjectChange: (state, action) => {
        state.activeProjectIndex = action.payload;
      },
      loadClasspath: (state, action) => {
        state.projectType = action.payload.projectType;
        state.output = action.payload.output;
        // Only update the array when they have different elements.
        if (isDifferentStringArray(state.sources, action.payload.sources)) {
          state.sources = action.payload.sources;
        }
        if (isDifferentStringArray(state.referencedLibraries, action.payload.referencedLibraries)) {
          state.referencedLibraries = action.payload.referencedLibraries;
        }
      },
      updateSource: (state, action) => {
        state.sources = action.payload;
      },
      setOutputPath: (state, action) => {
        state.output = action.payload;
      },
      removeReferencedLibrary: (state, action) => {
        const removedIndex: number = action.payload as number;
        if (removedIndex > -1 && removedIndex < state.referencedLibraries.length) {
          state.referencedLibraries.splice(removedIndex, 1);
        }
      },
      addReferencedLibraries: (state, action) => {
        state.referencedLibraries.push(...action.payload);
        state.referencedLibraries = _.uniq(state.referencedLibraries);
      },
      catchException: (state, action) => {
        state.exception = action.payload;
      }
    },
});

function isDifferentStringArray(a1: string[], a2: string[]): boolean {
  return !_.isEmpty(_.xor(a1, a2));
}

export const {
  listProjects,
  activeProjectChange,
  loadClasspath,
  updateSource,
  setOutputPath,
  removeReferencedLibrary,
  addReferencedLibraries,
  catchException,
} = classpathConfigurationViewSlice.actions;

export default classpathConfigurationViewSlice.reducer;
