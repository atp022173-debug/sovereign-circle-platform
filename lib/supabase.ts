import { createClient } from '@supabase/supabase-js';
export function userClient(token:string){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{global:{headers:{Authorization:`Bearer ${token}`}},auth:{persistSession:false,autoRefreshToken:false}})}
export function adminClient(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY!,{auth:{persistSession:false,autoRefreshToken:false}})}
export async function currentUser(req:Request){const header=req.headers.get('authorization')||'';if(!header.startsWith('Bearer '))return null;const token=header.slice(7);const client=userClient(token);const {data:{user},error}=await client.auth.getUser(token);return error||!user?null:{user,client};}
export function responseError(message:string,status=400){return Response.json({error:message},{status})}
