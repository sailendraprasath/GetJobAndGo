import { supabase } from './supabase';

export const jobsAPI = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        companies (
          id,
          company_name,
          location
        )
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    return { data, error };
  },

  getById: async (id) => {
    const { data, error } = await supabase
      .from('jobs')
      .select(`
        *,
        companies (
          id,
          company_name,
          location,
          description,
          website
        )
      `)
      .eq('id', id)
      .maybeSingle();

    return { data, error };
  },

  getByCompany: async (companyId) => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  create: async (jobData) => {
    const { data, error } = await supabase
      .from('jobs')
      .insert([jobData])
      .select()
      .single();

    return { data, error };
  },

  update: async (id, jobData) => {
    const { data, error } = await supabase
      .from('jobs')
      .update(jobData)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  delete: async (id) => {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);

    return { error };
  },
};

export const applicationsAPI = {
  getByStudent: async (studentId) => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        jobs (
          id,
          title,
          location,
          job_type,
          salary_range,
          companies (
            company_name
          )
        )
      `)
      .eq('student_id', studentId)
      .order('applied_at', { ascending: false });

    return { data, error };
  },

  getByJob: async (jobId) => {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        students (
          id,
          degree,
          skills,
          resume_url,
          phone,
          bio,
          profiles (
            full_name,
            email
          )
        )
      `)
      .eq('job_id', jobId)
      .order('applied_at', { ascending: false });

    return { data, error };
  },

  create: async (applicationData) => {
    const { data, error } = await supabase
      .from('applications')
      .insert([applicationData])
      .select()
      .single();

    return { data, error };
  },

  updateStatus: async (id, status) => {
    const { data, error } = await supabase
      .from('applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },
};

export const studentsAPI = {
  getProfile: async (id) => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        profiles (
          full_name,
          email
        )
      `)
      .eq('id', id)
      .maybeSingle();

    return { data, error };
  },

  update: async (id, studentData) => {
    const { data, error } = await supabase
      .from('students')
      .update(studentData)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },
};

export const companiesAPI = {
  getProfile: async (id) => {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        profiles (
          full_name,
          email
        )
      `)
      .eq('id', id)
      .maybeSingle();

    return { data, error };
  },

  update: async (id, companyData) => {
    const { data, error } = await supabase
      .from('companies')
      .update(companyData)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },

  getAll: async () => {
    const { data, error } = await supabase
      .from('companies')
      .select(`
        *,
        profiles (
          full_name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    return { data, error };
  },

  updateVerification: async (id, status) => {
    const { data, error } = await supabase
      .from('companies')
      .update({ verification_status: status })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  },
};
